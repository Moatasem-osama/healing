import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

export default function HerbDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  async function fetchDetails() {
    try {
      let { data } = await api.get(
        `/herbs/herb/${id}/`,
      );
      setDetails(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (!details) return <p className="text-center py-20">جار التحميل...</p>;

  return (
  <div className="container mx-auto px-4 py-12 max-w-6xl">
    <button
      onClick={() => navigate(-1)}
      className="mb-8 px-6 py-3 cursor-pointer bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      رجوع
    </button>

    <div className="bg-gradient-to-br from-white to-emerald-50 shadow-2xl rounded-3xl overflow-hidden border border-emerald-100">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col">
          <img 
            src={details.image_url} 
            alt={details.name} 
            className="w-full h-72 lg:h-80 object-cover rounded-2xl shadow-lg mb-6"
          />
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50">
            <h3 className="text-xl font-bold text-emerald-800 mb-4 font-cairo text-right">معلومات سريعة</h3>
            <div className="space-y-3 text-right">
              <div className="flex justify-between items-center border-b border-emerald-50 pb-2">
                <span className="text-emerald-600 font-medium">النوع</span>
                <span className="text-gray-700">عشبة طبية</span>
              </div>
              <div className="flex justify-between items-center border-b border-emerald-50 pb-2">
                <span className="text-emerald-600 font-medium">الفئة</span>
                <span className="text-gray-700">نباتات عطرية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/5 p-6 lg:p-8 lg:border-r lg:border-emerald-100">
          <h2 className="text-4xl font-bold text-emerald-800 mb-6 font-cairo text-right leading-tight">
            {details.name}
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed text-right text-lg">
            {details.description}
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50">
              <div className="flex items-center gap-3 mb-4 text-right">
                <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-emerald-800 font-cairo">طريقة التحضير</h3>
              </div>
              <p className="text-gray-600 leading-loose text-right">{details.uses}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50">
              <div className="flex items-center gap-3 mb-4 text-right">
                <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-emerald-800 font-cairo">المميزات</h3>
              </div>
              <p className="text-gray-600 leading-loose text-right">{details.benefits}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-50">
              <div className="flex items-center gap-3 mb-4 text-right">
                <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-emerald-800 font-cairo">الاعراض الجانبية</h3>
              </div>
              <p className="text-gray-600 leading-loose text-right">{details.harms}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}