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
});
