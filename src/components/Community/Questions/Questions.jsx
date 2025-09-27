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
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center font-cairo">
          📋 قائمة الأسئلة
        </h1>
        <Link to={'/community/questions/add'} className=" inline-block mb-6 px-5 py-3 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition-colors duration-300"> أضف سؤالاً جديداً</Link>
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            جاري تحميل الأسئلة...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid gap-6">
            {questions.length > 0 ? (
              questions.map((q) => (
                <Link
                  to={`/community/questions/${q.id}`}
                  key={q.id}
                  className="block"
                >
                  <article className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <h2 className="text-xl font-semibold text-emerald-700 mb-2">
                      ❓ {q.title}
                    </h2>

                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {q.body}
                    </p>

                    <footer className="flex justify-between items-center text-sm text-gray-500">
                      <span>✍️ {q.author}</span>
                      <time dateTime={q.created_at}>
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
