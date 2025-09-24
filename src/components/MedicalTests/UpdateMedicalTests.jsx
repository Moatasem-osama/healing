import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import Loader from "../Loader/Loader";

export default function UpdateMedicalTests() {
  const { userTokenAccess } = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);

  const validationSchema = Yup.object({
    date: Yup.date().required("التاريخ مطلوب"),
    time: Yup.string().required("الوقت مطلوب"),
    title: Yup.string().required("العنوان مطلوب"),
    subtitle: Yup.string().required("العنوان الفرعي مطلوب"),
    result: Yup.string().required("النتيجة مطلوبة"),
    notes: Yup.string(),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/medicalTests/all/${id}/`, {
          headers: { Authorization: `Bearer ${userTokenAccess}` },
        });
        setInitialValues(data);
      } catch (err) {
        toast.error("❌ فشل في جلب بيانات التحليل");
      }
    }
    fetchData();
  }, [id, userTokenAccess]);

  async function handleSubmit(values) {
    try {
      await api.put(`/medicalTests/all/${id}/`, values, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      toast.success("✅ تم تعديل التحليل بنجاح");
      navigate("/medicalTests");
    } catch (err) {
      toast.error(err?.response?.data?.error || "❌ حصل خطأ أثناء التعديل");
    }
  }

  if (!initialValues) {
    return <Loader/>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
  <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
    <Toaster position="top-center" />
    <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center font-cairo">
      ✏️ تعديل التحليل
    </h2>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-emerald-700 mb-3">📅 التاريخ</label>
              <Field
                type="date"
                name="date"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
              {touched.date && errors.date && (
                <p className="text-red-500 text-sm mt-2">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-emerald-700 mb-3">⏰ الوقت</label>
              <Field
                type="time"
                name="time"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
              {touched.time && errors.time && (
                <p className="text-red-500 text-sm mt-2">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">🏷️ العنوان الرئيسي</label>
            <Field
              type="text"
              name="title"
              placeholder="مثال : تحليل صورة الدم الكاملة (CBC) "
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            {touched.title && errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">📋 العنوان الفرعي</label>
            <Field
              type="text"
              name="subtitle"
              placeholder="مثال : الهيموغلوبين – كرات الدم البيضاء – الصفائح الدموية"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            {touched.subtitle && errors.subtitle && (
              <p className="text-red-500 text-sm mt-2">{errors.subtitle}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">✅ النتيجة</label>
            <Field
              type="text"
              name="result"
              placeholder="الهيموغلوبين: 13.5 g/dL – ضمن المعدل الطبيعي"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            {touched.result && errors.result && (
              <p className="text-red-500 text-sm mt-2">{errors.result}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">📝 الملاحظات</label>
            <Field
              as="textarea"
              name="notes"
              placeholder="أدخل أي ملاحظات إضافية..."
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            {touched.notes && errors.notes && (
              <p className="text-red-500 text-sm mt-2">{errors.notes}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💾 حفظ التعديلات
          </button>
        </Form>
      )}
    </Formik>
  </div>
</div>

  );
}