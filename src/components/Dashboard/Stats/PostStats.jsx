import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";

export default function PostStats() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validationSchema = Yup.object({
    sugar_level: Yup.number()
      .required("مطلوب")
      .min(40, "القيمة أقل من الطبيعي")
      .max(500, "القيمة أعلى من الطبيعي"),
    blood_pressure_systolic: Yup.number()
      .required("مطلوب")
      .min(60, "قيمة غير منطقية")
      .max(250, "قيمة غير منطقية"),
    blood_pressure_diastolic: Yup.number()
      .required("مطلوب")
      .min(40, "قيمة غير منطقية")
      .max(150, "قيمة غير منطقية"),
    notes: Yup.string().max(200, "الحد الأقصى 200 حرف"),
  });

  const onSubmit = useCallback(
    async (values) => {
      setFormError("");
      setLoading(true);
      try {
        await api.post("/health/stats/", values);
        navigate("/dashboard");
      } catch (err) {
        setFormError(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "حدث خطأ أثناء الحفظ. حاول مرة أخرى."
        );
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const formik = useFormik({
    initialValues: {
      sugar_level: "",
      blood_pressure_systolic: "",
      blood_pressure_diastolic: "",
      notes: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F9F7] via-white to-[#E6F4EA] py-12 px-4 flex items-start justify-center">
      <section
        aria-labelledby="page-title"
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8"
      >
        <header className="mb-4 text-center">
          <h1
            id="page-title"
            className="text-2xl sm:text-3xl font-extrabold text-emerald-700"
          >
            إضافة قياس صحي
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            أدخل القياسات بدقة ليتابع النظام مؤشراتك الصحية
          </p>
        </header>

        <form
          onSubmit={formik.handleSubmit}
          noValidate
          aria-describedby={formError ? "form-error" : undefined}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="sugar_level"
                className="block text-sm font-medium text-gray-700"
              >
                مستوى السكر (mg/dL)
              </label>
              <input
                id="sugar_level"
                name="sugar_level"
                type="number"
                inputMode="numeric"
                required
                min="0"
                value={formik.values.sugar_level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={
                  formik.touched.sugar_level && formik.errors.sugar_level
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  formik.touched.sugar_level && formik.errors.sugar_level
                    ? "sugar-error"
                    : undefined
                }
                placeholder="مثال: 110"
                className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {formik.touched.sugar_level && formik.errors.sugar_level && (
                <p id="sugar-error" className="mt-1 text-xs text-red-600">
                  {formik.errors.sugar_level}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="blood_pressure_systolic"
                  className="block text-sm font-medium text-gray-700"
                >
                  ضغط دم انقباضي (Systolic)
                </label>
                <input
                  id="blood_pressure_systolic"
                  name="blood_pressure_systolic"
                  type="number"
                  inputMode="numeric"
                  required
                  min="0"
                  value={formik.values.blood_pressure_systolic}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.blood_pressure_systolic &&
                    formik.errors.blood_pressure_systolic
                      ? "true"
                      : "false"
                  }
                  aria-describedby={
                    formik.touched.blood_pressure_systolic &&
                    formik.errors.blood_pressure_systolic
                      ? "bp-sys-error"
                      : undefined
                  }
                  placeholder="مثال: 120"
                  className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                {formik.touched.blood_pressure_systolic &&
                  formik.errors.blood_pressure_systolic && (
                    <p id="bp-sys-error" className="mt-1 text-xs text-red-600">
                      {formik.errors.blood_pressure_systolic}
                    </p>
                  )}
              </div>

              <div>
                <label
                  htmlFor="blood_pressure_diastolic"
                  className="block text-sm font-medium text-gray-700"
                >
                  ضغط دم انبساطي (Diastolic)
                </label>
                <input
                  id="blood_pressure_diastolic"
                  name="blood_pressure_diastolic"
                  type="number"
                  inputMode="numeric"
                  required
                  min="0"
                  value={formik.values.blood_pressure_diastolic}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.blood_pressure_diastolic &&
                    formik.errors.blood_pressure_diastolic
                      ? "true"
                      : "false"
                  }
                  aria-describedby={
                    formik.touched.blood_pressure_diastolic &&
                    formik.errors.blood_pressure_diastolic
                      ? "bp-dias-error"
                      : undefined
                  }
                  placeholder="مثال: 80"
                  className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                {formik.touched.blood_pressure_diastolic &&
                  formik.errors.blood_pressure_diastolic && (
                    <p id="bp-dias-error" className="mt-1 text-xs text-red-600">
                      {formik.errors.blood_pressure_diastolic}
                    </p>
                  )}
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                ملاحظات (اختياري)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                maxLength={200}
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={
                  formik.touched.notes && formik.errors.notes ? "true" : "false"
                }
                aria-describedby={
                  formik.touched.notes && formik.errors.notes
                    ? "notes-error"
                    : undefined
                }
                placeholder="ملاحظات قصيرة (أعراض، سياق القياس... )"
                className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {formik.touched.notes && formik.errors.notes && (
                <p id="notes-error" className="mt-1 text-xs text-red-600">
                  {formik.errors.notes}
                </p>
              )}
            </div>

            {formError && (
              <div
                id="form-error"
                role="alert"
                className="text-sm text-red-600 bg-red-50 rounded-md p-2"
              >
                {formError}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-semibold hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:opacity-60"
                aria-busy={loading ? "true" : "false"}
              >
                {loading ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : null}
                حفظ القياس
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
