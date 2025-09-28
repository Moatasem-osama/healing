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
  <section className="min-h-screen bg-gray-50 font-cairo">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <main className="w-full">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">السجل الصحي</h1>
              <Link
                to="stats/poststats"
                className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
                aria-label="إضافة قياس جديد"
              >
                <i className="fa fa-2x me-2 fa-plus ml-2"></i> إضافة قياس
              </Link>
            </div>

            <section className="mb-8" aria-label="ملخص الإحصائيات">
              <Summary />
            </section>

            {stats.length === 0 ? (
              <div className="text-center py-12">
                <i className="fa fa-4x fa-inbox text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg">لا توجد بيانات بعد</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm" aria-label="جدول القياسات الصحية">
                  <thead>
                    <tr className="bg-emerald-50 text-emerald-800">
                      <th scope="col" className="px-6 py-4 text-right font-semibold">#</th>
                      <th scope="col" className="px-6 py-4 text-right font-semibold">مستوى السكر</th>
                      <th scope="col" className="px-6 py-4 text-right font-semibold">الضغط (انقباضي)</th>
                      <th scope="col" className="px-6 py-4 text-right font-semibold">الضغط (انبساطي)</th>
                      <th scope="col" className="px-6 py-4 text-right font-semibold">ملاحظات</th>
                      <th scope="col" className="px-6 py-4 text-right font-semibold">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.map((stat, i) => (
                      <tr key={stat.id || i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-center text-gray-600 font-medium">{i + 1}</td>
                        <td className="px-6 py-4 text-center font-semibold text-emerald-600">
                          {stat.sugar_level}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-700">
                          {stat.blood_pressure_systolic}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-700">
                          {stat.blood_pressure_diastolic}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          {stat.notes || "—"}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-500 text-sm">
                          {new Date(stat.date).toLocaleDateString("ar-EG")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  </section>
);
}
