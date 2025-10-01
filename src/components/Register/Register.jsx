import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance.js";
import { Link } from "react-router-dom";
import welcoming from '../../assets/undraw_sign-up_qamz.svg'


export default function Register() {

  const { setUserTokenRefresh, setUserTokenAccess } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function register(values) {
    try {
      setLoading(true);
      const payload = {
        ...values,
        age: values.age || "",
        height: values.height || "",
        weight: values.weight || "",
      };

      console.log("Sending:", payload);

      const { data } = await api.post("/auth/register/", payload);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      setUserTokenAccess(data.tokens.access);
      setUserTokenRefresh(data.tokens.refresh);
      toast.success("تم التسجيل بنجاح");

      navigate("/");
    } catch (error) {
      let err =  error.response?.data?.error.email || error.response?.data?.error.username || error.response?.data?.detail || "حدث خطأ غير متوقع، حاول مرة أخرى.";
      console.log(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[\p{L}\s'-]+$/u, "الاسم الأول يجب أن يحتوي على حروف فقط")
      .required("الاسم الأول مطلوب"),
    last_name: Yup.string()
      .matches(/^[\p{L}\s'-]+$/u, "الاسم الأخير يجب أن يحتوي على حروف فقط")
      .required("الاسم الأخير مطلوب"),
    username: Yup.string()
      .matches(/^[a-zA-Z0-9._-]{3,20}$/, "اسم المستخدم يجب أن يكون من 3 إلى 20 حرفًا")
      .required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
    "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، وتشمل رقمًا وحرفًا إنجليزيًا واحدًا على الأقل."
  )
  .required("كلمة المرور مطلوبة"),
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

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      age: "",
      height: "",
      weight: "",
      gender: "",
      diseases: "",
      allergies: "",
      medications: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return ( 
    <>
    <br/>
  <div className="font-cairo flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[var(--color-secondary)] via-white to-[var(--color-primary-light)] " >
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Form Section - Left Side */}
      <div className="w-full md:w-1/2 p-6 md:p-8 order-2 md:order-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h2>
            <p className="text-gray-600 text-xs md:text-sm">املأ البيانات التالية لإنشاء حسابك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* الحقول الرئيسية */}
{[
  { name: "first_name", placeholder: "الاسم الأول", autoComplete: "given-name", type: "text" },
  { name: "last_name", placeholder: "الاسم الأخير", autoComplete: "family-name", type: "text" },
  { name: "username", placeholder: "اسم المستخدم", autoComplete: "username", type: "text" },
  { name: "email", placeholder: "البريد الإلكتروني", autoComplete: "email", type: "email" },
  { name: "password", placeholder: "كلمة المرور", autoComplete: "new-password", type: "password" },
  { name: "age", placeholder: "العمر", autoComplete: "off", type: "number" },
  { name: "height", placeholder: "الطول (سم)", autoComplete: "off", type: "number" },
  { name: "weight", placeholder: "الوزن (كجم)", autoComplete: "off", type: "number" },
].map((field) => (
  <div
    key={field.name}
    className={field.name === "username" || field.name === "email" ? "md:col-span-2" : ""}
  >
    <label
      htmlFor={field.name}
      className="block text-sm font-medium text-gray-700 mb-2 text-right"
    >
      {field.placeholder}
    </label>
    <input
      type={field.type}
      name={field.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[field.name]}
      id={field.name}
      autoComplete={field.autoComplete}
      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none 
                 transition-all text-sm md:text-base"
      placeholder={field.placeholder}
    />
    {formik.touched[field.name] && formik.errors[field.name] && (
      <p className="text-red-500 text-xs mt-1 text-right">{formik.errors[field.name]}</p>
    )}
  </div>
))}


            {/* Gender Select */}
            <div className="md:col-span-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                الجنس
              </label>
              <select
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                id="gender"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm md:text-base"
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-xs mt-1 text-right">{formik.errors.gender}</p>
              )}
            </div>

            {/* Full-width fields */}
            {[
              { name: "diseases", placeholder: "الأمراض المزمنة", type: "text" },
              { name: "allergies", placeholder: "الحساسية", type: "text" },
              { name: "medications", placeholder: "الأدوية", type: "text" },
            ].map((field) => (
              <div key={field.name} className="md:col-span-2">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {field.placeholder}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                  id={field.name}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm md:text-base"
                  placeholder={field.placeholder}
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1 text-right">{formik.errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all disabled:opacity-50 text-sm md:text-base mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                جاري التسجيل...
              </span>
            ) : (
              "إنشاء حساب"
            )}
          </button>

          <Link to='../login' className="text-center mt-4 md:mt-6 block">
            <p className="text-gray-600 text-xs md:text-sm">
              إذا كان لديك حساب بالفعل، يمكنك تسجيل الدخول
            </p>
          </Link>
        </form>
      </div>
      
      {/* Image Section - Right Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center p-6 md:p-8 order-1 md:order-2">
        <img 
          src={welcoming} 
          alt="Welcome" 
          className="w-full h-auto max-w-[200px] md:max-w-xs"
        />
      </div>
    </div>
  </div>
  </>
);
            }            
