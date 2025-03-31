"use server";
import { db } from "@/lib/prisma";
import { getTypesById } from "@/lib/projectActivityTypes";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";
import arcjt from "@/lib/arcjet";

export async function createScribeEntry(data) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    // Adding rate limiting using Arcjet
    const req = await request();
    const decision = await arcjt.protect(req, { userId, requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: { remaining, resetInSeconds: reset },
        });
        return { success: false, error: "Too many requests. Please try again later" };
      }
      return { success: false, error: "Request blocked" };
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const activityType = getTypesById(data.activityType);
    if (!activityType) return { success: false, error: "Invalid type" };

    const entry = await db.entry.create({
      data: {
        title: data.title,
        content: data.content,
        activityType: activityType.id,
        activityTypeScore: activityType.score,
        activityImageUrl: activityType.imageUrl,
        userId: user.id,
        collectionId: data.collectionId || null,
      },
    });

    await db.draft.deleteMany({ where: { userId: user.id } });
    revalidatePath("/dashboard");
    return entry;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getScribeEntry({ collectionId, orderBy = "desc" } = {}) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const entries = await db.entry.findMany({
      where: {
        userId: user.id,
        ...(collectionId === "unorganized" ? { collectionId: null } : collectionId ? { collectionId } : {}),
      },
      include: { collection: { select: { id: true, name: true } } },
      orderBy: { createdAt: orderBy },
    });

    return { success: true, data: { entries: entries.map(entry => ({ ...entry, activityTypeData: getTypesById(entry.activityType) })) } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getEntry(id) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const entry = await db.entry.findFirst({
      where: { id, userId: user.id },
      include: { collection: { select: { id: true, name: true } } },
    });

    return entry || null;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteEntry(id) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const entry = await db.entry.findFirst({ where: { userId: user.id, id } });
    if (!entry) return { success: false, error: "Entry not found" };

    await db.entry.delete({ where: { id } });
    revalidatePath("/dashboard");

    return entry;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateEntry(data) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const existingEntry = await db.entry.findFirst({ where: { userId: user.id, id: data.id } });
    if (!existingEntry) return { success: false, error: "Entry not found" };

    const activityType = getTypesById(data.activityType);
    if (!activityType) return { success: false, error: "Invalid type" };

    const updatedEntry = await db.entry.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        activityType: activityType.id,
        activityTypeScore: activityType.score,
        activityImageUrl: activityType.imageUrl,
        userId: user.id,
        collectionId: data.collectionId || null,
      },
    });

    revalidatePath(`/scribe/${data.id}`);
    return updatedEntry;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getDraft() {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const draft = await db.draft.findUnique({ where: { userId: user.id } });

    return { success: true, data: draft };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function saveDraft(data) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const activityType = getTypesById(data.activityType);
    if (!activityType) return { success: false, error: "Invalid type" };

    const draft = await db.draft.upsert({
      where: { userId: user.id },
      create: {
        title: data.title,
        content: data.content,
        activityType: activityType.id,
        userId: user.id,
      },
      update: {
        title: data.title,
        content: data.content,
        activityType: activityType.id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: draft };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

