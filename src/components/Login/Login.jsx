// import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance.js";

import welcoming from '../../assets/undraw_welcoming_42an.svg'
export default function Login() {
   const errorMessages = {
    "No active account found with the given credentials": "لا يوجد مستخدم بهذا الاسم",

  };
 let { setUserTokenRefresh, setUserTokenAccess } = useContext(userContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await api.post("/auth/login/", values);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      setUserTokenAccess(data.tokens.access);
      setUserTokenRefresh(data.tokens.refresh);
      toast.success("تم تسجيل الدخول بنجاح!");
      navigate("/");
    } catch (error) {
        let serverMessage = error.response.data.detail;
        
      let translatedMessage = errorMessages[serverMessage] || "حدث خطأ غير متوقع، حاول مرة أخرى.";

      toast.error(translatedMessage);
        setLoading(false)
        console.log(error);
        
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]{3,20}$/,
        "اسم المستخدم يجب أن يكون من 3 إلى 20 حرفًا، ويُسمح بالأرقام والنقاط والشرطات"
      )
      .required("اسم المستخدم مطلوب"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، وتشمل رقم وحرف واحد على الأقل."
      )
      .required("كلمة المرور مطلوبة"),
    });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return ( <div className="font-cairo flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[var(--color-secondary)] via-white to-[var(--color-primary-light)]">
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="w-full md:w-1/2 p-6 md:p-8 order-2 md:order-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">مرحبًا بعودتك</h2>
            <p className="text-gray-600 text-xs md:text-sm">سجل الدخول إلى حسابك</p>
          </div>

          <div className="mb-4 md:mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 text-right">
              اسم المستخدم
            </label>
            <input
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              id="username"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm md:text-base"
              placeholder="أدخل اسم المستخدم"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1 text-right">{formik.errors.username}</p>
            )}
          </div>

          <div className="mb-4 md:mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-right">
              كلمة المرور
            </label>
            <input
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm md:text-base"
              placeholder="أدخل كلمة المرور"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1 text-right">{formik.errors.password}</p>
            )}
          </div>

          {loading ? (
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all disabled:opacity-50 text-sm md:text-base"
              disabled
            >
              جاري التسجيل...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-sm md:text-base"
            >
              تسجيل الدخول
            </button>
          )}

          <div className="text-center mt-4 md:mt-6">
            <p className="text-gray-600 text-xs md:text-sm">
              ان لم يكن لديك حساب برجاء تسجيل الدخول 
            </p>
          </div>
        </form>
      </div>
      
      <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center p-6 md:p-8 order-1 md:order-2">
        <img 
          src={welcoming} 
          alt="Welcome" 
          className="w-full h-auto max-w-[200px] md:max-w-xs"
        />
      </div>
    </div>
  </div>
  );
}
