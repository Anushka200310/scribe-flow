import { z } from "zod";

export const scribeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "content is required"),
    activityType: z.string().min(1, "Project activity type is required"),
    collectionId: z.string().optional(),

})

export const collectionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional()
})



