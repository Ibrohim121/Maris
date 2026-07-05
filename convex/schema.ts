import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    password: v.string(),
    role: v.union(v.literal("student"), v.literal("admin"), v.literal("teacher")),
  })
    .index("by_email", ["email"]),

  resetCodes: defineTable({
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
  })
    .index("by_email", ["email"]),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
  }),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    enrolledAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_courseId", ["courseId"])
    .index("by_userId_courseId", ["userId", "courseId"]),

  homeworkTasks: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    type: v.union(v.literal("writing"), v.literal("listening")),
    content: v.string(),
    createdAt: v.number(),
  })
    .index("by_courseId", ["courseId"]),

  homeworkSubmissions: defineTable({
    homeworkId: v.id("homeworkTasks"),
    userId: v.id("users"),
    content: v.string(),
    score: v.optional(v.number()),
    feedback: v.optional(v.string()),
    submittedAt: v.number(),
  })
    .index("by_homeworkId", ["homeworkId"])
    .index("by_userId", ["userId"])
    .index("by_homeworkId_userId", ["homeworkId", "userId"]),
});
