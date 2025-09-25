import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  async function getQuestions() {
    try {
      let { data } = await api.get("/community/questions/");
      console.log(data);
      
      setQuestions(data.questions); // 🎯 خزّن الأسئلة
    } catch (err) {
      console.error("❌ Error fetching questions:", err);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center font-cairo">
          📋 قائمة الأسئلة
        </h2>

        <div className="grid gap-6">
          {questions.length > 0 ? (
            questions.map((q) => (
                <Link to={`/community/questions/${q.id}`} key={q.id}>
              <div
                className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 hover:shadow-lg transition-all duration-300"
              >
                {/* العنوان */}
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  ❓ {q.title}
                </h3>

                {/* النص */}
                <p className="text-gray-700 mb-4">{q.body}</p>

                {/* معلومات إضافية */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>✍️ {q.author}</span>
                  <span>
                    🕒 {new Date(q.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>

                </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              لا توجد أسئلة متاحة حالياً.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
