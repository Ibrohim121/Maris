"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Send, AlertCircle, CheckCircle, Loader2, Shield } from "lucide-react";

interface WritingHomeworkProps {
  task: {
    _id: string;
    title: string;
    content: string;
    type: string;
  };
  userId: string;
}

export default function WritingHomework({ task, userId }: WritingHomeworkProps) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  const submitWriting = useMutation(api.homework.submitWriting);
  const checkWriting = useMutation(api.homework.checkWriting);

  const submission = useQuery(api.homework.getSubmission, {
    homeworkId: task._id as any,
    userId: userId as any,
  });

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await submitWriting({ homeworkId: task._id as any, userId: userId as any, content: text });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheck = async () => {
    if (!text.trim()) return;
    setChecking(true);
    setResult(null);
    try {
      const res = await submitWriting({ homeworkId: task._id as any, userId: userId as any, content: text });
      const submissionId = (res as any).submissionId;
      const checkRes = await checkWriting({
        submissionId: submissionId as any,
        content: text,
        topic: task.content,
      });
      setResult(checkRes);
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Shield size={18} className="text-[#FFD700]" />
          Topic
        </h2>
        <div
          className="p-4 bg-gray-50 rounded-lg text-gray-700 text-sm leading-relaxed select-none"
          style={{ WebkitUserSelect: "none", userSelect: "none" }}
          onContextMenu={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
        >
          {task.content}
        </div>
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <Shield size={12} />
          Screenshot protection enabled
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-3">Your Writing</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={handlePaste}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg text-gray-900 text-sm resize-y focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
          placeholder="Write your answer here... (pasting is disabled)"
          disabled={submitting || checking}
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">
            {text.split(/\s+/).filter(Boolean).length} words
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || submitting || checking}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Save Draft
            </button>
            <button
              onClick={handleCheck}
              disabled={!text.trim() || checking || submitting}
              className="px-5 py-2 rounded-lg bg-[#FFD700] text-black text-sm font-semibold hover:scale-105 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {checking ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CheckCircle size={16} />
              )}
              Check with AI
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">AI Evaluation Result</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
              result.score >= 70
                ? "bg-green-50 text-green-700"
                : result.score >= 40
                ? "bg-yellow-50 text-yellow-700"
                : "bg-red-50 text-red-700"
            }`}>
              {result.score}%
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {result.score >= 70
                  ? "Excellent writing!"
                  : result.score >= 40
                  ? "Needs improvement"
                  : "Requires significant revision"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {result.score >= 70 ? "Your writing is well-structured and on topic." :
                 result.score >= 40 ? "Your writing has some issues to address." :
                 "Your writing needs substantial improvement."}
              </p>
            </div>
          </div>
          {result.feedback && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-2">
                {result.score >= 70 ? (
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm text-gray-700">{result.feedback}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {submission && !result && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Previous Submission</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mb-3">{submission.content}</p>
          {submission.score !== undefined && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Score: {submission.score}%</span>
              {submission.feedback && (
                <span className="text-sm text-gray-500">{submission.feedback}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
