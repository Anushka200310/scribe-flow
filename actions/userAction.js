"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const findOrCreateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { success: false, error: "User not authenticated" };

    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existingUser) return { success: true, data: existingUser };

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: user.firstName || user.fullName || "Unknown User",
        imageUrl: user.imageUrl,
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || null,
      },
    });

    return { success: true, data: newUser };
  } catch (error) {
    console.error("Error saving user:", error);
    return { success: false, error: error.message };
  }
};
