"use server"
import arcjt from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function CreateCollection(data){
    try {
        const { userId } = await auth();
        if(!userId) return { success: false, error: "Unauthorized" };

        //rate limiting

        const req = await request();

        const decision = await arcjt.protect(req, {
            userId,
            requested: 1
        })

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const { remaining, reset } = decision.reason;
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details: {
                        remaining,
                        resetInSeconds: reset,
                    },
                });
                return { success: false, error: "Too many requests. Please try again later." };
            }
            return { success: false, error: "Request blocked" };
        }


        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        
        if(!user){
            return { success: false, error: "User not found" };
        }

    const collection = await db.collection.create({
       data: {
        name: data.name,
        description: data.description,
        userId: user.id,
       }
    });
    
    revalidatePath("/dashboard");
    return collection;

    } catch (error) {
        return { success: false, error: error.message };
    }
}


export async function GetCollections(){

        const { userId } = await auth();
        if(!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        
        if(!user){
            return { success: false, error: "User not found" };

        }

    const collections = await db.collection.findMany({
       where: {
        userId: user.id,
       },
       orderBy: {
        createdAt: "desc"
       },
    });
    
    return collections;
  
}


export async function getCollection(collectionId){

    const { userId } = await auth();
    if(!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });
    
    if(!user){
        return { success: false, error: "User not found" };
    }

const collections = await db.collection.findUnique({
   where: {
    userId: user.id,
    id: collectionId
   },
});

return { success: true, data: collections };

}

export async function deleteCollection(collectionId){

    try {
        const { userId } = await auth();
        if(!userId) return { success: false, error: "Unauthorized" };
    
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        
        if(!user){
            return { success: false, error: "User not found" };
        }
    
    const collection = await db.collection.findFirst({
       where: {
        userId: user.id,
        id: collectionId
       },
    });

    if(!collection) return { success: false, error: "Collection not found" };

    await db.collection.delete({
        where: {
            id: collectionId
        }
    })
    
    return true;

    } catch (error) {
        return { success: false, error: error.message };
    } 

}