import React, { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function MedicalTests() {
  const { userTokenAccess } = useContext(userContext);
  const [medicalTests, setMedicalTests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMedical() {
    try {
      const { data } = await api.get(`/medicalTests/all/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      setMedicalTests(data.medicalTests);
    } catch (err) {
      console.error("❌ Error fetching medicalTests:", err.response?.data?.error || err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedical();
  }, []);

  if (loading) return <Loader />;

  return (
     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 font-cairo">🔬 التحاليل الطبية</h1>
            <Link
              to={'add'}
              className="bg-emerald-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ➕ أضف تحليل جديد
            </Link>
          </div>

          {medicalTests.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-12 text-center">
              <p className="text-2xl text-gray-500 mb-4">🔍 لا توجد تحاليل طبية متاحة</p>
              <p className="text-gray-600">ابدأ بإضافة أول تحليل طبي لك</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {medicalTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 font-cairo"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-emerald-800 mb-2">
                      {test.title || "تحليل غير معروف"}
                    </h2>
                    {test.subtitle && (
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">
                        {test.subtitle}
                      </h3>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <span className="text-emerald-700">📊</span>
                      </div>
                      <span className="text-gray-700 font-medium">{test.type || "—"}</span>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <span className="text-emerald-700">📅</span>
                      </div>
                      <span className="text-gray-700">التاريخ: {test.date || "—"}</span>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <span className="text-emerald-700">✅</span>
                      </div>
                      <span className="text-emerald-600 font-semibold">النتيجة: {test.result || "—"}</span>
                    </div>
                  </div>

                  {test.notes && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-6">
                      <div className="flex items-center mb-2">
                        <div className="bg-emerald-100 p-2 rounded-lg ml-2">
                          <span className="text-emerald-700">📝</span>
                        </div>
                        <span className="text-emerald-800 font-semibold">ملاحظات:</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{test.notes}</p>
                    </div>
                  )}

                  <Link
                    to={`update/${test.id}`}
                    className="block w-full bg-emerald-100 text-emerald-700 text-center font-semibold py-3 px-4 rounded-xl hover:bg-emerald-200 transition-all duration-300"
                  >
                    تعديل التحليل
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
