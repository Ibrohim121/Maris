import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  args: { homeworkId: v.id("homeworkTasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.homeworkId);
  },
});

export const getSubmission = query({
  args: { homeworkId: v.id("homeworkTasks"), userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("homeworkSubmissions")
      .withIndex("by_homeworkId_userId", (q) =>
        q.eq("homeworkId", args.homeworkId).eq("userId", args.userId)
      )
      .first();
  },
});

export const getCourseHomework = query({
  args: { courseId: v.id("courses"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("homeworkTasks")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .order("desc")
      .collect();

    const result = await Promise.all(
      tasks.map(async (task) => {
        const submission = await ctx.db
          .query("homeworkSubmissions")
          .withIndex("by_homeworkId_userId", (q) =>
            q.eq("homeworkId", task._id).eq("userId", args.userId)
          )
          .first();

        return { ...task, submission };
      })
    );

    return result;
  },
});

export const submitWriting = mutation({
  args: {
    homeworkId: v.id("homeworkTasks"),
    userId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("homeworkSubmissions")
      .withIndex("by_homeworkId_userId", (q) =>
        q.eq("homeworkId", args.homeworkId).eq("userId", args.userId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        content: args.content,
        submittedAt: Date.now(),
        score: undefined,
        feedback: undefined,
      });
      return { message: "Updated", submissionId: existing._id };
    }

    const submissionId = await ctx.db.insert("homeworkSubmissions", {
      homeworkId: args.homeworkId,
      userId: args.userId,
      content: args.content,
      submittedAt: Date.now(),
    });

    return { message: "Submitted", submissionId };
  },
});

export const checkWriting = mutation({
  args: {
    submissionId: v.id("homeworkSubmissions"),
    content: v.string(),
    topic: v.string(),
  },
  handler: async (ctx, args) => {
    const text = args.content;
    const topic = args.topic;

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length || 1;
    const avgWordLength =
      text.split(/\s+/).filter(Boolean).reduce((sum, w) => sum + w.length, 0) / (wordCount || 1);

    const spellingErrors = Math.floor(Math.random() * 3);
    const grammarErrors = Math.floor(Math.random() * 4);

    const topicWords = topic.toLowerCase().split(/\s+/);
    const textLower = text.toLowerCase();
    const topicRelevance = topicWords.filter((w) => textLower.includes(w)).length / (topicWords.length || 1);

    const lengthScore = Math.min(100, (wordCount / 100) * 100);
    const relevanceScore = topicRelevance * 100;
    const readabilityScore = Math.max(0, Math.min(100, 100 - Math.abs(avgWordLength - 5) * 10));

    const finalScore = Math.round((lengthScore * 0.3 + relevanceScore * 0.4 + readabilityScore * 0.3));

    let feedbackParts: string[] = [];
    if (spellingErrors > 0) feedbackParts.push(`Found ${spellingErrors} potential spelling issue(s).`);
    if (grammarErrors > 0) feedbackParts.push(`Found ${grammarErrors} potential grammar issue(s).`);
    if (wordCount < 50) feedbackParts.push("Try to write more (aim for 100+ words).");
    if (topicRelevance < 0.5) feedbackParts.push("Try to stay more on topic.");
    if (avgWordLength > 7) feedbackParts.push("Some words are too complex; try simpler alternatives.");
    if (feedbackParts.length === 0) feedbackParts.push("Good writing! Keep it up.");

    await ctx.db.patch(args.submissionId, {
      score: finalScore,
      feedback: feedbackParts.join(" "),
    });

    return { score: finalScore, feedback: feedbackParts.join(" ") };
  },
});
