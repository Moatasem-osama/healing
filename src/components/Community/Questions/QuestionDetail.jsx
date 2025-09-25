import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function QuestionDetail() {
  const { id } = useParams(); // 🆔 id بتاع السؤال
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  async function getQuestion() {
    try {
      let { data } = await api.get(`/community/questions/${id}/`);
      console.log(data);
      
      setQuestion(data.question);
    } catch (err) {
      console.error("❌ Error fetching question:", err);
    }
  }

  async function getAnswers() {
    try {
      let { data } = await api.get(
        `/community/questions/${id}/answers/`
      );
      console.log(data);
      
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
      getAnswers(); // حدث القائمة
    } catch (err) {
      console.error("❌ Error adding answer:", err);
    }
  }

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-12 vh-100">
      {question && (
        <>
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            ❓ {question.title}
          </h2>
          <p className="text-gray-700 mb-4">{question.body}</p>
          <div className="text-sm text-gray-500 mb-6">
            ✍️ {question.author} | 🕒{" "}
            {new Date(question.created_at).toLocaleDateString("ar-EG")}
          </div>
        </>
      )}

      {/* الإجابات */}
      <h3 className="text-xl font-semibold text-emerald-600 mb-4">
        💬 الإجابات
      </h3>
      <div className="space-y-4 mb-6">
        {answers.length > 0 ? (
          answers.map((a) => (
            <div
              key={a.id}
              className="p-4 border border-emerald-100 rounded-xl bg-emerald-50"
            >
              <p className="text-gray-800">{a.body}</p>
              <span className="text-xs text-gray-500 block mt-2">
                ✍️ {a.author} | 🕒{" "}
                {new Date(a.created_at).toLocaleDateString("ar-EG")}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">لا توجد إجابات بعد.</p>
        )}
      </div>

      {/* إضافة إجابة */}
      <form onSubmit={handleAddAnswer} className="space-y-4">
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="✍️ أضف إجابتك هنا..."
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          rows="3"
          required
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition"
        >
          ➕ نشر الإجابة
        </button>
      </form>
    </div>
  );
}
