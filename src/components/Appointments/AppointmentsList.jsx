import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import AddAppointment from "./AddAppointment"; // ✅ استدعاء الفورم
import toast from "react-hot-toast";
import { DataContext } from "../../context/DataContext";

export default function AppointmentsList() {
  const { userTokenAccess } = useContext(userContext);
  const { setAppointmentsCount } = useContext(DataContext);
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // ✅ حالة المودال

  async function fetchAppointments() {
    try {
      const { data } = await api.get(`/appointments/all/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      setAppointments(data.appointments);
      setAppointmentsCount(data.appointments.length);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/appointments/${id}/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success("تم حذف الموعد بنجاح!");
    } catch (err) {
      console.error("❌ Error deleting appointment:", err.response?.data?.error || err.message);
    }
  }

  useEffect(() => {
    if (userTokenAccess) {
      fetchAppointments();
    }
  }, [userTokenAccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 font-cairo">📅 المواعيد</h1>
          <button
            onClick={() => setShowModal(true)} // ✅ فتح المودال
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg"
          >
            <span className="ml-2">➕</span>
            اضافة موعد جديد
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 text-center">
            <p className="text-xl text-gray-600">⏳ جاري تحميل المواعيد...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-12 text-center">
            <p className="text-2xl text-gray-500 mb-4">🚫 لا توجد مواعيد مضافة</p>
            <p className="text-gray-600">ابدأ بإضافة أول موعد لك</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 hover:shadow-lg transition-all duration-300"> <div className="grid md:grid-cols-2 gap-6 mb-4">
               <div className="space-y-3">
               <div className="flex items-center"> 
               <div className="bg-emerald-100 p-2 rounded-lg ml-3"> 
               <span className="text-emerald-700">📅</span> 
               </div> 
               <p className="text-lg font-semibold text-emerald-800">{a.date}</p> 
               </div> <div className="flex items-center"> 
               <div className="bg-emerald-100 p-2 rounded-lg ml-3"> 
               <span className="text-emerald-700">⏰</span>
                </div> <p className="text-lg text-gray-700">{a.time}</p>
                 </div> <div className="flex items-center"> 
                 <div className="bg-emerald-100 p-2 rounded-lg ml-3"> 
                 <span className="text-emerald-700">📍</span> </div>
                  <p className="text-lg text-gray-700">{a.location}</p> 
                  </div> 
                  </div> <div className="space-y-3"> <div className="flex items-center"> <div className="bg-emerald-100 p-2 rounded-lg ml-3"> <span className="text-emerald-700">👨‍⚕️</span> 
                  </div> <p className="text-lg text-gray-700">{a.appointments_to}</p> 
                  </div> <div className="flex items-center"> <div className="bg-emerald-100 p-2 rounded-lg ml-3"> <span className="text-emerald-700">📌</span> 
                  </div> <p className="text-lg text-gray-700">{a.appointment_type}</p> 
                  </div> 
                  </div> 
                  </div> {a.notes_or_details && ( <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-4"> <div className="flex items-center mb-2"> <div className="bg-emerald-100 p-2 rounded-lg ml-2"> <span className="text-emerald-700">📝</span> 
                  </div> <p className="text-lg font-semibold text-emerald-800">ملاحظات إضافية:</p> 
                  </div> <p className="text-gray-700 pr-4">{a.notes_or_details}</p> 
                  </div> )}
                <div className="flex justify-end pt-4 border-t border-emerald-100">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-100 text-red-600 px-6 py-2 rounded-xl hover:bg-red-200 transition-all duration-300 font-semibold flex items-center"
                  >
                    <span className="ml-2">🗑️</span>
                    حذف الموعد
                  </button>
                
                </div>
              
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ المودال */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 ">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl relative mt-10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>

            <AddAppointment
              onSuccess={() => {
                fetchAppointments(); // ✅ تحديث القائمة
                setShowModal(false); // ✅ قفل المودال
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
