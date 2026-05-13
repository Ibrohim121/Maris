import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
    role: v.union(v.literal("student"), v.literal("admin"), v.literal("teacher")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      password: args.password,
      role: args.role,
    });

    return { _id: userId, email: args.email, name: args.name, role: args.role };
  },
});

export const authenticateUser = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || user.password !== args.password) {
      return null;
    }

    return { _id: user._id, email: user.email, name: user.name, role: user.role };
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const updatePassword = mutation({
  args: {
    email: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (user) {
      await ctx.db.patch(user._id, { password: args.newPassword });
      return { _id: user._id, email: user.email, name: user.name, role: user.role };
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.email.split("@")[0],
      password: args.newPassword,
      role: "student",
    });

    return { _id: userId, email: args.email, name: args.email.split("@")[0], role: "student" as const };
  },
});

export const signInOrCreateUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.union(v.literal("student"), v.literal("admin"), v.literal("teacher")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      if (existing.password !== args.password) {
        throw new Error("Invalid password");
      }
      return {
        _id: existing._id,
        email: existing.email,
        name: existing.name,
        role: existing.role,
      };
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      password: args.password,
      role: args.role,
    });

    return {
      _id: userId,
      email: args.email,
      name: args.name,
      role: args.role,
    };
  },
});
