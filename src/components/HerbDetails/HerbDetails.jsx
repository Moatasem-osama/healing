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
    <div className="container mx-auto px-4 py-20 mt-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 cursor-pointer bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        ← رجوع
      </button>

      <div className="bg-white shadow-lg rounded-2xl p-6">
      <img src={details.image_url} alt="" />
        <h2 className="text-2xl text-green-800 mb-4 font-[var(--font-cairo)] ">{details.name}</h2>
        <p className="text-gray-700 mb-4">{details.description}</p>
        <p>{details.uses}</p>
        <p className="my-5">{details.benefits}</p>
        <p>{details.harms}</p>
      </div>
    </div>
  );
}