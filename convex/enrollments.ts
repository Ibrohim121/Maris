import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getStudentCourses = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const courses = await Promise.all(
      enrollments.map(async (enr) => {
        const course = await ctx.db.get(enr.courseId);
        return course ? { enrollmentId: enr._id, course, enrolledAt: enr.enrolledAt } : null;
      })
    );

    return courses.filter(Boolean);
  },
});

export const enroll = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_userId_courseId", (q) =>
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .first();

    if (existing) {
      return { message: "Already enrolled" };
    }

    await ctx.db.insert("enrollments", {
      userId: args.userId,
      courseId: args.courseId,
      enrolledAt: Date.now(),
    });

    return { message: "Enrolled successfully" };
  },
});
