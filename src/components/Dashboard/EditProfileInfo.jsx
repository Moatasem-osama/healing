import {  useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditProfileInfo() {
  const [userInfo, setUserInfo] = useState(null);
  let navigate = useNavigate();
  async function getUserInfo() {
    try {
      let { data } = await api.get(
        `/auth/account/userProfile/`,
      );
      setUserInfo(data.user);

    } catch (err) {
      toast.error("فشل في تحميل البيانات");
    }
  }

  async function updateProfile(values) {
    try {
      await api.put(
        `/auth/account/userProfile/`,
        values,
      );
      toast.success("تم تعديل البيانات بنجاح");
      navigate('/dashboard')
    } catch (err) {
      toast.error("فشل في تعديل البيانات");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("مطلوب"),
    last_name: Yup.string().required("مطلوب"),
     age: Yup.number()
          .nullable()
          .min(10, "العمر يجب أن يكون أكبر من 10 سنوات")
          .max(120, "يرجى إدخال عمر صحيح")
          .required("العمر مطلوب"),
        height: Yup.number()
          .nullable()
          .min(50, "الطول غير صحيح")
          .max(200, "الطول غير صحيح")
          .required("الطول مطلوب"),
        weight: Yup.number()
          .nullable()
          .min(15, "الوزن غير صحيح")
          .max(300, "الوزن غير صحيح")
          .required("الوزن مطلوب"),
        gender: Yup.string()
          .oneOf(["ذكر", "أنثى"], "الرجاء اختيار الجنس")
          .required("الجنس مطلوب"),
     diseases: Yup.string(),
    allergies: Yup.string(),
    medications: Yup.string(),
  });

  return (
      <div className="p-6 font-cairo bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold text-emerald-600 mb-8 text-center">تعديل البيانات الشخصية</h1>

      {userInfo && (
        <Formik
          initialValues={{
            first_name: userInfo?.name?.first || "",
            last_name: userInfo?.name?.last || "",
            age: userInfo?.age || "",
            gender: userInfo?.gender || "",
            diseases: userInfo?.diseases || "",
            allergies: userInfo?.allergies || "",
            medications: userInfo?.medications || "",
            height: userInfo?.height || "",
            weight: userInfo?.weight || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => updateProfile(values)}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الاسم الأول</label>
                  <Field name="first_name" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  <ErrorMessage name="first_name" component="div" className="text-red-500 mt-2 text-sm" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الاسم الأخير</label>
                  <Field name="last_name" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  <ErrorMessage name="last_name" component="div" className="text-red-500 mt-2 text-sm" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">العمر</label>
                  <Field name="age" type="number" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  <ErrorMessage name="age" component="div" className="text-red-500 mt-2 text-sm" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الجنس</label>
                  <Field as="select" name="gender" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="">اختر</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500 mt-2 text-sm" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الوزن</label>
                  <Field name="weight" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                   <ErrorMessage name="weight" component="div" className="text-red-500 mt-2 text-sm" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الطول (سم)</label>
                  <Field name="height" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                   <ErrorMessage name="height" component="div" className="text-red-500 mt-2 text-sm" />

                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الأمراض المزمنة</label>
                  <Field name="diseases" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الحساسية</label>
                  <Field name="allergies" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">الأدوية</label>
                  <Field name="medications" className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  حفظ التعديلات
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
