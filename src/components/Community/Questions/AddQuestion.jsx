import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import api from "../../utils/axiosInstance"; // make sure this points to your configured Axios instance

export default function AddQuestion() {
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("عنوان السؤال مطلوب")
        .min(5, "العنوان قصير جدًا"),
      body: Yup.string()
        .required("تفاصيل السؤال مطلوبة")
        .min(10, "التفاصيل قصيرة جدًا"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // POST request to backend
        await api.post("/community/questions/", values);
        resetForm();
        toast.error("تم نشر السؤال بنجاح!");
      } catch (err) {
        console.error(err);
        toast.error("حدث خطأ أثناء نشر السؤال.");
      }
    },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        أضف سؤالاً جديدًا
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
        noValidate
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-medium text-gray-700"
          >
            عنوان السؤال
          </label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps("title")}
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="اكتب عنوانًا واضحًا لسؤالك"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="body"
            className="block mb-2 font-medium text-gray-700"
          >
            تفاصيل السؤال
          </label>
          <textarea
            id="body"
            rows="6"
            {...formik.getFieldProps("body")}
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none ${
              formik.touched.body && formik.errors.body
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="اشرح سؤالك بالتفصيل ليساعدك الآخرون"
          />
          {formik.touched.body && formik.errors.body && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.body}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition"
        >
          نشر السؤال
        </button>
      </form>
    </main>
  );
}