import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

export default function Library() {
  const [herbs, setHerbs] = useState([]);
let navigate = useNavigate(); 
  async function getHerbs() {
    try {
      let { data } = await api.get(
        "/herbs/all/",
      );
      setHerbs(data);
    } catch (error) {
      console.error("Error fetching herbs:", error);
      toast.error("فشل في جلب البيانات");
    }
  }

  useEffect(() => {
    getHerbs();
  }, []);

  return (
    <>
      
      {herbs.length === 0 ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6 ">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-12 text-center font-cairo">
              🌿 مكتبة الأعشاب
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
              <table className="w-full border-collapse table-auto md:table-fixed border text-right">
                <thead className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
                  <tr>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      #
                    </th>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      اسم العشبة
                    </th>
                    <th className="px-8 py-6 font-cairo font-bold text-lg">
                      الوصف
                    </th>
              
                  </tr>
                </thead>
                <tbody>
                  {herbs.map((herb, index) => (
                    <tr
                    onClick={()=> navigate(`/herbDetails/${herb.id}`)}
                      key={herb.id}
                      className="border-b border-emerald-100 last:border-0 hover:bg-emerald-50/50 transition-all duration-300"
                    >
                      <td className="px-8 py-6 text-gray-600 text-lg font-medium">{index + 1}</td>
                      <td className="px-8 py-6 font-semibold text-emerald-800 text-lg">
                        {herb.name}
                      </td>
                      <td className="px-8 py-6 text-gray-700 max-w-md">
                        <div className="line-clamp-2 text-lg leading-relaxed">
                          {herb.description}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
