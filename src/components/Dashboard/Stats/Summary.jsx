import { useEffect, useState, useCallback } from "react";
import api from "../../utils/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Summary() {
  const [summary, setSummary] = useState(null);

  const getStatsSummary = useCallback(async () => {
    try {
      const { data } = await api.get("/health/stats/summary/");
      setSummary(data.summary || null);
    } catch {
      setSummary(null);
    }
  }, []);

  useEffect(() => {
    getStatsSummary();
  }, [getStatsSummary]);

  if (!summary) {
    return (
      <p className="text-center text-gray-600" role="status" aria-live="polite">
        جاري التحميل...
      </p>
    );
  }

  const chartData = [
    { name: "متوسط السكر", value: summary.sugar_avg },
    { name: "أعلى سكر", value: summary.sugar_max },
    { name: "أقل سكر", value: summary.sugar_min },
    { name: "ضغط انقباضي", value: summary.bp_systolic_avg },
    { name: "ضغط انبساطي", value: summary.bp_diastolic_avg },
  ];

  return (
    <section
      className="max-w-5xl mx-auto py-8 space-y-8"
      aria-label="ملخص القياسات"
    >
      <h2 className="text-2xl font-bold text-emerald-700">ملخص القياسات</h2>

      <div className="bg-white p-6 rounded-xl shadow" role="img" aria-label="مخطط بياني للقياسات">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-lg text-center">
          <h3 className="font-semibold">عدد الإدخالات</h3>
          <p className="text-2xl font-bold text-emerald-700">
            {summary.total_entries}
          </p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg text-center">
          <h3 className="font-semibold">متوسط السكر</h3>
          <p className="text-2xl font-bold text-emerald-700">
            {summary.sugar_avg}
          </p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg text-center">
          <h3 className="font-semibold">متوسط الضغط</h3>
          <p className="text-lg font-bold text-emerald-700">
            {(
              (summary.bp_systolic_avg + summary.bp_diastolic_avg) /
              2
            ).toFixed(1)}
          </p>
        </div>
      </div>
    </section>
  );
}
