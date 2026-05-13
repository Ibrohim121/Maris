import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const sendResetCode = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("resetCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await ctx.db.insert("resetCodes", {
      email: args.email,
      code,
      expiresAt,
    });

    console.log(`[DEV] Reset code for ${args.email}: ${code}`);

    return { success: true };
  },
});

export const verifyResetCode = mutation({
  args: {
    email: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("resetCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!record) return false;
    if (record.code !== args.code) return false;
    if (Date.now() > record.expiresAt) return false;

    return true;
  },
});

export const clearResetCode = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("resetCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (record) {
      await ctx.db.delete(record._id);
    }
  },
});
