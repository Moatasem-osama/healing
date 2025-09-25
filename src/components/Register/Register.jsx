
// import { useFormik } from "formik";
// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { userContext } from "../../context/UserContext";
// import api from "../utils/axiosInstance.js";

// export default function Register() {
//   const errorMessages = {
//     "This username is already taken": "اسم المستخدم مستخدم بالفعل.",
//   };
//   let { setUserTokenRefresh, setUserTokenAccess } = useContext(userContext);
//   let navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   async function register(values) {
//     try {
//       setLoading(true);
//       let { data } = await api.post("/auth/register/", values);

//       localStorage.setItem("accessToken", data.tokens.access);
//       localStorage.setItem("refreshToken", data.tokens.refresh);
//       setUserTokenAccess(data.tokens.access);
//       setUserTokenRefresh(data.tokens.refresh);

//       toast.success("تم التسجيل بنجاح!");
//       navigate("/home");
//     } catch (error) {
//       let serverMessage = error.response?.data?.error;
//       let translatedMessage =
//         errorMessages[serverMessage] || "حدث خطأ غير متوقع، حاول مرة أخرى.";
//       toast.error(translatedMessage);
//     } finally {
//       setLoading(false);
//     }
//   }

//   let validationSchema = Yup.object().shape({
//     first_name: Yup.string()
//       .matches(/^[\p{L}\s'-]+$/u, "الاسم الأول يجب أن يحتوي على حروف فقط")
//       .required("الاسم الأول مطلوب"),
//     last_name: Yup.string()
//       .matches(/^[\p{L}\s'-]+$/u, "الاسم الأخير يجب أن يحتوي على حروف فقط")
//       .required("الاسم الأخير مطلوب"),
//     username: Yup.string()
//       .matches(
//         /^[a-zA-Z0-9._-]{3,20}$/,
//         "اسم المستخدم يجب أن يكون من 3 إلى 20 حرفًا"
//       )
//       .required("اسم المستخدم مطلوب"),
//     email: Yup.string()
//       .email("يرجى إدخال بريد إلكتروني صحيح")
//       .required("البريد الإلكتروني مطلوب"),
//     password: Yup.string()
//       .matches(
//         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
//         "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، وتشمل رقم وحرف واحد على الأقل."
//       )
//       .required("كلمة المرور مطلوبة"),
//     age: Yup.number()
//       .min(10, "العمر يجب أن يكون أكبر من 10 سنوات")
//       .max(120, "يرجى إدخال عمر صحيح")
//       .required("العمر مطلوب"),
//     height: Yup.number()
//       .min(30, "الطول غير صحيح")
//       .max(250, "الطول غير صحيح")
//       .required("الطول مطلوب"),
//     weight: Yup.number()
//       .min(2, "الوزن غير صحيح")
//       .max(300, "الوزن غير صحيح")
//       .required("الوزن مطلوب"),
//     gender: Yup.string()
//       .oneOf(["ذكر", "أنثى", "Male", "Female"], "الرجاء اختيار الجنس")
//       .required("الجنس مطلوب"),
//     diseases: Yup.string(),
//     allergies: Yup.string(),
//     medications: Yup.string(),
//   });

//   let formik = useFormik({
//     initialValues: {
//       first_name: "",
//       last_name: "",
//       username: "",
//       email: "",
//       password: "",
//       age: "",
//       height: "",
//       weight: "",
//       gender: "",
//       diseases: "",
//       allergies: "",
//       medications: "",
//     },
//     validationSchema,
//     onSubmit: register,
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)] font-[var(--font-sans)]">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-4 animate-slideDown"
//       >
//         <h2 className="text-2xl font-bold text-center text-[var(--color-primary)]">
//           إنشاء حساب جديد
//         </h2>

//         {[
//           { name: "first_name", placeholder: "الاسم الأول" },
//           { name: "last_name", placeholder: "الاسم الأخير" },
//           { name: "username", placeholder: "اسم المستخدم" },
//           { name: "email", placeholder: "البريد الإلكتروني", type: "email" },
//           { name: "password", placeholder: "كلمة المرور", type: "password" },
//           { name: "age", placeholder: "العمر", type: "number" },
//           { name: "height", placeholder: "الطول (سم)", type: "number" },
//           { name: "weight", placeholder: "الوزن (كجم)", type: "number" },
//           { name: "diseases", placeholder: "الأمراض المزمنة" },
//           { name: "allergies", placeholder: "الحساسية" },
//           { name: "medications", placeholder: "الأدوية" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type={field.type || "text"}
//               name={field.name}
//               placeholder={field.placeholder}
//               onChange={formik.handleChange}
//               value={formik.values[field.name]}
//               className="w-full border border-[var(--color-gray)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
//             />
//             {formik.errors[field.name] && (
//               <div className="text-[var(--color-error)] text-sm mt-1">
//                 {formik.errors[field.name]}
//               </div>
//             )}
//           </div>
//         ))}

//         <div>
//           <select
//             name="gender"
//             onChange={formik.handleChange}
//             value={formik.values.gender}
//             className="w-full border border-[var(--color-gray)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
//           >
//             <option value="">اختر الجنس</option>
//             <option value="ذكر">ذكر</option>
//             <option value="أنثى">أنثى</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           {formik.errors.gender && (
//             <div className="text-[var(--color-error)] text-sm mt-1">
//               {formik.errors.gender}
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[var(--color-primary)] text-white font-bold py-2 rounded-lg hover:bg-[var(--color-primary-light)] transition disabled:opacity-50"
//         >
//           {loading ? "جاري التسجيل..." : "تسجيل"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance.js";

export default function Register() {
  const errorMessages = {
    "This username is already taken": "اسم المستخدم مستخدم بالفعل.",
  };
  let { setUserTokenRefresh, setUserTokenAccess } = useContext(userContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await api.post("/auth/register/", values);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      setUserTokenAccess(data.tokens.access);
      setUserTokenRefresh(data.tokens.refresh);

      toast.success("تم التسجيل بنجاح!");
      navigate("/");
    } catch (error) {
      let serverMessage = error.response?.data?.error;
      let translatedMessage =
        errorMessages[serverMessage] || "حدث خطأ غير متوقع، حاول مرة أخرى.";
      toast.error(translatedMessage);
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[\p{L}\s'-]+$/u, "الاسم الأول يجب أن يحتوي على حروف فقط")
      .required("الاسم الأول مطلوب"),
    last_name: Yup.string()
      .matches(/^[\p{L}\s'-]+$/u, "الاسم الأخير يجب أن يحتوي على حروف فقط")
      .required("الاسم الأخير مطلوب"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]{3,20}$/,
        "اسم المستخدم يجب أن يكون من 3 إلى 20 حرفًا"
      )
      .required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، وتشمل رقم وحرف واحد على الأقل."
      )
      .required("كلمة المرور مطلوبة"),
    age: Yup.number()
      .min(10, "العمر يجب أن يكون أكبر من 10 سنوات")
      .max(120, "يرجى إدخال عمر صحيح")
      .required("العمر مطلوب"),
    height: Yup.number()
      .min(30, "الطول غير صحيح")
      .max(250, "الطول غير صحيح")
      .required("الطول مطلوب"),
    weight: Yup.number()
      .min(2, "الوزن غير صحيح")
      .max(300, "الوزن غير صحيح")
      .required("الوزن مطلوب"),
    gender: Yup.string()
      .oneOf(["ذكر", "أنثى"], "الرجاء اختيار الجنس")
      .required("الجنس مطلوب"),
    diseases: Yup.string(),
    allergies: Yup.string(),
    medications: Yup.string(),
  });

  let formik = useFormik({
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)] via-white to-[var(--color-primary-light)] font-[var(--font-sans)] p-6" style={{ marginTop: '-80px', }}>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl shadow-[var(--color-primary)]/20 w-full max-w-2xl space-y-6 animate-slideDown border border-white/20 mt-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] bg-clip-text text-transparent">
              إنشاء حساب جديد
            </h2>
            <p className="text-[var(--color-gray)] mt-2">املأ البيانات التالية لإنشاء حسابك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "first_name", placeholder: "الاسم الأول" },
              { name: "last_name", placeholder: "الاسم الأخير" },
              { name: "username", placeholder: "اسم المستخدم" },
              { name: "email", placeholder: "البريد الإلكتروني", type: "email" },
              { name: "password", placeholder: "كلمة المرور", type: "password" },
              { name: "age", placeholder: "العمر", type: "number" },
              { name: "height", placeholder: "الطول (سم)", type: "number" },
              { name: "weight", placeholder: "الوزن (كجم)", type: "number" },
              { name: "diseases", placeholder: "الأمراض المزمنة", className: "md:col-span-2" },
              { name: "allergies", placeholder: "الحساسية", className: "md:col-span-2" },
              { name: "medications", placeholder: "الأدوية", className: "md:col-span-2" },
            ].map((field) => (
              <div key={field.name} className={field.className || ""}>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  value={formik.values[field.name]}
                  className="w-full border-2 border-[var(--color-gray)]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-light)]/20 transition-all duration-300 hover:border-[var(--color-gray)]/50"
                />
                {formik.errors[field.name] && (
                  <div className="text-[var(--color-error)] text-sm mt-2 font-medium flex items-center gap-1">
                    <span><i className="fa fa-warning"></i></span>
                    {formik.errors[field.name]}
                  </div>
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <select
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                className="w-full border-2 border-[var(--color-gray)]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-light)]/20 transition-all duration-300 hover:border-[var(--color-gray)]/50"
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
              {formik.errors.gender && (
                <div className="text-[var(--color-error)] text-sm mt-2 font-medium flex items-center gap-1">
                  <span><i className="fa fa-warning"></i></span>
                  {formik.errors.gender}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-black py-4 rounded-xl hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري التسجيل...
              </span>
            ) : (
              "تسجيل"
            )}
          </button>
        </form>
      </div>
    </>
  );
}