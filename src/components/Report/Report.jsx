import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance";

export default function Report() {
  const { userTokenAccess } = useContext(userContext);

  async function fetchReport(download = true) {
    try {
      const { data } = await api.get(`/user/report/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
        responseType: "blob",
      });

      const file = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);

      if (download) {
        // تحميل الملف
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "تقريري.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        // معاينة في نافذة جديدة
        window.open(url, "_blank");
      }

      // تفريغ الرابط من الميموري بعد ثانيتين
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);

    } catch (err) {
      console.error("❌ خطأ أثناء جلب التقرير:", err.response?.data?.error || err);
    }
  }

  return (
    <>
      <button
        onClick={() => fetchReport(true)}
        className="bg-green-600 w-full my-3 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
      >
        تحميل التقرير
      </button>
      <button
        onClick={() => fetchReport(false)}
        className="bg-blue-600 w-full text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        معاينة التقرير
      </button>
    </>
  );
}
