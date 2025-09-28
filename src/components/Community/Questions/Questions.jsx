import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axiosInstance";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getQuestions() {
    try {
      const { data } = await api.get("/community/questions/");
      setQuestions(data.questions || []);
    } catch {
      setError("حدث خطأ أثناء جلب الأسئلة");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12 px-6 font-cairo">
      <div className="max-w-4xl mx-auto">
        {/* ===== عنوان الصفحة ===== */}
        <header className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 relative z-10">
              📋 قائمة الأسئلة
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-emerald-100 rounded-full opacity-70 z-0"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            شارك أسئلتك حول الطب الطبيعي وتبادل المعرفة مع باقي الأعضاء 🌿
          </p>
          <Link
            to={"/community/questions/add"}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold hover:shadow-emerald-200 hover:shadow-xl hover:-translate-y-1"
          >
            <span>أضف سؤالاً جديداً</span>
            <span className="text-lg">➕</span>
          </Link>
        </header>

        {/* ===== حالات التحميل / الخطأ ===== */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            جاري تحميل الأسئلة...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {/* ===== قائمة الأسئلة ===== */}
        {!loading && !error && (
          <div className="grid gap-8">
            {questions.length > 0 ? (
              questions.map((q) => (
                <Link
                  to={`/community/questions/${q.id}`}
                  key={q.id}
                  className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200 p-6 hover:scale-[1.02] group"
                >
                  <article>
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="text-xl font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors">
                        ❓ {q.title}
                      </h2>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {q.body}
                    </p>

                    <footer className="flex justify-between items-center text-sm">
                      <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                        ✍️ {q.author}
                      </span>
                      <time
                        dateTime={q.created_at}
                        className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full"
                      >
                        🕒{" "}
                        {new Date(q.created_at).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </footer>
                  </article>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">
                لا توجد أسئلة متاحة حالياً.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
