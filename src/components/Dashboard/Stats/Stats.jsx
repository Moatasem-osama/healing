import { useEffect, useState, useCallback } from "react";
import api from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Summary from "./Summary";

export default function Stats() {
  const [stats, setStats] = useState([]);

  const getStats = useCallback(async () => {
    try {
      const { data } = await api.get("/health/stats/");
      setStats(data.data || []);
    } catch {
      setStats([]);
    }
  }, []);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <main
      className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-xl font-cairo"
      role="main"
      aria-label="السجل الصحي"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-emerald-700">السجل الصحي</h1>
        <Link
          to="stats/poststats"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="إضافة قياس جديد"
        >
          إضافة قياس
        </Link>
      </div>

      <section className="mb-8" aria-label="ملخص الإحصائيات">
        <Summary />
      </section>

      {stats.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد بيانات بعد</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="جدول القياسات الصحية">
            <thead>
              <tr className="bg-emerald-100 text-emerald-800">
                <th scope="col" className="border border-gray-200 px-4 py-2">#</th>
                <th scope="col" className="border border-gray-200 px-4 py-2">مستوى السكر</th>
                <th scope="col" className="border border-gray-200 px-4 py-2">الضغط (انقباضي)</th>
                <th scope="col" className="border border-gray-200 px-4 py-2">الضغط (انبساطي)</th>
                <th scope="col" className="border border-gray-200 px-4 py-2">ملاحظات</th>
                <th scope="col" className="border border-gray-200 px-4 py-2">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, i) => (
                <tr key={stat.id || i} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 px-4 py-3 text-center">{i + 1}</td>
                  <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-emerald-700">
                    {stat.sugar_level}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    {stat.blood_pressure_systolic}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    {stat.blood_pressure_diastolic}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center text-gray-600">
                    {stat.notes || "—"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center text-gray-500">
                    { new Date(stat.date).toLocaleDateString("ar-EG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
