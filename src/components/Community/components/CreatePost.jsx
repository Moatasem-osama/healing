import { useState, useContext } from "react";
import api from "../../utils/axiosInstance";
import { userContext } from "../../../context/UserContext";
import toast from "react-hot-toast";

export default function CreatePost({ onSuccess }) {
  const { userTokenAccess } = useContext(userContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    // ممكن تضيف حقول أخرى مثل image, category إذا تحتاجها
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post(
        "/community/recipes/",
        form,
      );
      toast.success("تم إنشاء الوصفة بنجاح!");
      // تنظيف الفورم
      setForm({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
      });
      if (onSuccess) onSuccess(data);  // تمرير الرد إذا تحب
    } catch (err) {
      console.error("❌ Error creating recipe:", err.response?.data || err);
      toast.error("تم رفض الوصفة من قبل نظام المراجعة الآلي. يرجى تصحيح البيانات.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-8 px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow border border-emerald-100 p-6">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
          إنشاء وصفة جديدة
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-emerald-700 mb-1">
              العنوان
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-emerald-700 mb-1">
              الوصف
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-emerald-700 mb-1">
              المكونات
            </label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-emerald-700 mb-1">
              التعليمات
            </label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading ? "bg-emerald-300" : "bg-emerald-600 hover:bg-emerald-700"
              } transition`}
            >
              {loading ? "جاري الإنشاء..." : "إنشاء الوصفة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
