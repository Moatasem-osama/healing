import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  async function getQuestion() {
    try {
      let { data } = await api.get(`/community/questions/${id}/`);
      setQuestion(data.question);
    } catch (err) {
      console.error("❌ Error fetching question:", err);
    }
  }
  // ضيفها فوق الكومبوننت
  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000); // الفرق بالثواني

    const days = Math.floor(diff / (60 * 60 * 24));
    const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));

    if (days > 0) {
      return `منذ ${days} يوم و ${hours} ساعة`;
    } else if (hours > 0) {
      return `منذ ${hours} ساعة`;
    } else {
      const minutes = Math.floor(diff / 60);
      return minutes > 0 ? `منذ ${minutes} دقيقة` : "الآن";
    }
  }

  async function getAnswers() {
    try {
      let { data } = await api.get(`/community/questions/${id}/answers/`);
      setAnswers(data.answers);
    } catch (err) {
      console.error("❌ Error fetching answers:", err);
    }
  }

  async function handleAddAnswer(e) {
    e.preventDefault();
    try {
      await api.post(`/community/questions/${id}/answers/`, {
        body: newAnswer,
      });
      toast.success("✅ تم إضافة إجابتك بنجاح!");
      setNewAnswer("");
      getAnswers();
    } catch (err) {
      console.error("❌ Error adding answer:", err);
    }
  }

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3 space-y-6">
        {/* السؤال */}
        {question && (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-emerald-700 mb-3">
              {question.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{question.body}</p>
          </div>
        )}

        {/* التعليقات */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
            <i className="fa fa-comments"></i>
            التعليقات ({answers.length})
          </h3>

          <div className="space-y-4 mb-6">
            {answers.length > 0 ? (
              answers.map((a) => (
                <div key={a.id} className="border-b border-gray-100 pb-3">
                  <p className="text-gray-800">{a.body}</p>
                  <div className="text-xs text-gray-500 mt-2 flex items-center gap-3">
                    <i className="fa fa-user text-emerald-600"></i>
                    {a.author}
                    <span className="text-gray-400">|</span>
                    <i className="fa fa-clock text-emerald-600"></i>
                    {new Date(a.created_at).toLocaleDateString("ar-EG")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">لا توجد تعليقات بعد.</p>
            )}
          </div>

          {/* إضافة تعليق */}
          <form onSubmit={handleAddAnswer} className="space-y-4">
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="أضف تعليقك هنا..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              rows="3"
              required
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
            >
              <i className="fa fa-plus"></i> أضف تعليق
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
  {/* عن السؤال */}
  <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
      <i className="fa fa-info-circle text-emerald-600"></i>
      عن السؤال
    </h4>

    {/* تاريخ النشر */}
    <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-200 pb-3 mb-3">
      <span className="flex items-center gap-2">
        <i className="fa fa-calendar text-emerald-600"></i>
        تاريخ النشر
      </span>
      <span>{question && timeAgo(question.created_at)}</span>
    </div>

    {/* ناشر السؤال */}
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
        <i className="fa fa-user text-emerald-600 text-xl"></i>
      </div>
      <div>
        <p className="text-sm font-medium">{question?.author}</p>
        <span className="text-xs text-gray-500">ناشر السؤال</span>
      </div>
    </div>
  </div>

</div>

    </div>
  );
}
