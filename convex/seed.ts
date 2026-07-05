import { mutation } from "./_generated/server";

export const seedInitialUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "igofurjonov"))
      .first();

    if (existing) {
      return { message: "User already exists", user: { _id: existing._id, email: existing.email, name: existing.name, role: existing.role } };
    }

    const userId = await ctx.db.insert("users", {
      email: "igofurjonov",
      name: "Ibrohim",
      password: "salom229",
      role: "student",
    });

    return {
      message: "User created successfully",
      user: { _id: userId, email: "igofurjonov", name: "Ibrohim", role: "student" },
    };
  },
});

export const seedInitialData = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").collect();
    if (existingCourses.length > 0) {
      return { message: "Data already seeded" };
    }

    const course1 = await ctx.db.insert("courses", {
      title: "Advanced Machine Learning",
      description: "Deep dive into neural networks, reinforcement learning, and NLP with hands-on projects.",
      image: "/maris-logo.jpg",
    });

    const course2 = await ctx.db.insert("courses", {
      title: "Full-Stack Web Engineering",
      description: "Build modern web applications with React, Next.js, Node.js, and databases.",
      image: "/maris-logo.jpg",
    });

    const course3 = await ctx.db.insert("courses", {
      title: "Financial Modeling & Valuation",
      description: "Master financial analysis, DCF models, and investment banking techniques.",
      image: "/maris-logo.jpg",
    });

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "igofurjonov"))
      .first();

    if (user) {
      await ctx.db.insert("enrollments", { userId: user._id, courseId: course1, enrolledAt: Date.now() });
      await ctx.db.insert("enrollments", { userId: user._id, courseId: course2, enrolledAt: Date.now() });
    }

    const now = Date.now();
    await ctx.db.insert("homeworkTasks", {
      courseId: course1,
      title: "Explain Neural Networks",
      type: "writing",
      content: "Write an essay explaining how neural networks work and their real-world applications.",
      createdAt: now - 86400000 * 3,
    });

    await ctx.db.insert("homeworkTasks", {
      courseId: course1,
      title: "Audio Lecture Summary",
      type: "listening",
      content: "/audio/lecture1.mp3",
      createdAt: now - 86400000 * 2,
    });

    await ctx.db.insert("homeworkTasks", {
      courseId: course1,
      title: "Reinforcement Learning Concepts",
      type: "writing",
      content: "Describe the key concepts of reinforcement learning and compare it with supervised learning.",
      createdAt: now - 86400000 * 1,
    });

    await ctx.db.insert("homeworkTasks", {
      courseId: course2,
      title: "React Component Design",
      type: "writing",
      content: "Design a reusable component library architecture. Explain your choices for state management and styling.",
      createdAt: now - 86400000 * 4,
    });

    await ctx.db.insert("homeworkTasks", {
      courseId: course2,
      title: "API Design Podcast",
      type: "listening",
      content: "/audio/api-design.mp3",
      createdAt: now - 86400000 * 1,
    });

    return { message: "Data seeded successfully" };
  },
});
