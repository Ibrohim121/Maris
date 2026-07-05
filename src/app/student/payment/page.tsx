"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const payments = [
  { id: "INV-001", course: "Advanced Machine Learning", amount: 249, status: "paid", date: "2026-06-01" },
  { id: "INV-002", course: "Full-Stack Web Engineering", amount: 199, status: "paid", date: "2026-06-01" },
  { id: "INV-003", course: "Advanced Machine Learning (Monthly)", amount: 50, status: "pending", date: "2026-07-01" },
];

export default function PaymentPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  if (!user) return null;

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <CreditCard size={28} className="text-[#FFD700]" />
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Paid</p>
            <p className="text-3xl font-bold text-green-600">${totalPaid}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-3xl font-bold text-amber-600">${totalPending}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
            <div>Invoice</div>
            <div>Course</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </div>
          <div className="divide-y divide-gray-100">
            {payments.map((p) => (
              <div key={p.id} className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50">
                <div className="font-medium">{p.id}</div>
                <div>{p.course}</div>
                <div>${p.amount}</div>
                <div className="text-gray-500">{p.date}</div>
                <div>
                  {p.status === "paid" ? (
                    <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                      <CheckCircle size={12} /> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-medium">
                      <AlertCircle size={12} /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
