// import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance.js";
export default function Login() {
   const errorMessages = {
    "This username is already taken.": "اسم المستخدم مستخدم بالفعل.",

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
      navigate("/home");
    } catch (error) {
        let serverMessage = error.response.data.error;
        
      let translatedMessage = errorMessages[serverMessage] || "حدث خطأ غير متوقع، حاول مرة أخرى.";

      toast.error(translatedMessage);
        setLoading(false)
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

  return (
     <form
        className="w-full max-w-md mx-auto p-8 bg-white/95]backdrop-blur-lg rounded-2xl shadow-2xl shadow-primary/20 border border-white/20"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-6">
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            id="username"
            aria-invalid={
              formik.touched.username && formik.errors.username ? "true" : "false"
            }
            aria-describedby="usernameError"
            className="block w-full rounded-xl border-2 border-gray-200/60 px-4 py-3 text-base text-black transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none hover:border-gray-300"
            placeholder="اسم المستخدم"
          />
          {formik.touched.username && formik.errors.username && (
            <p id="usernameError" role="alert" className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1">
              <span><i className="fa fa-warning"></i></span>
              {formik.errors.username}
            </p>
          )}
        </div>

        <div className="mb-8">
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            id="password"
            aria-invalid={
              formik.touched.password && formik.errors.password ? "true" : "false"
            }
            aria-describedby="passwordError"
            className="block w-full rounded-xl border-2 border-gray-200/60 px-4 py-3 text-base text-black transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none hover:border-gray-300"
            placeholder="كلمة المرور"
          />
          {formik.touched.password && formik.errors.password && (
            <p id="passwordError" role="alert" className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1">
              <span><i className="fa fa-warning"></i></span>
              {formik.errors.password}
            </p>
          )}
        </div>

        {loading ? (
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/90 px-5 py-3.5 text-white font-bold transition-all duration-300 transform hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              جاري التسجيل...
            </div>
          </button>
        ) : (
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/90 px-5 py-3.5 text-white font-bold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            تسجيل
          </button>
        )}
      </form>
  );
}
