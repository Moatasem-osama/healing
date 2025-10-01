import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import AddAppointment from "./AddAppointment";
import toast from "react-hot-toast";
import { DataContext } from "../../context/DataContext";

export default function AppointmentsList() {
  const { userTokenAccess } = useContext(userContext);
  const { setAppointmentsCount } = useContext(DataContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function fetchAppointments() {
    try {
      const { data } = await api.get(`/appointments/all/`);
      setAppointments(data.appointments);
      setAppointmentsCount(data.appointments.length);
      localStorage.setItem("appointmentsCount", data.appointments.length);
    } catch {
      toast.error("حدث خطأ أثناء تحميل المواعيد");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/appointments/${id}/`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      setAppointmentsCount((prev) => prev - 1);
      localStorage.setItem("appointmentsCount", appointments.length - 1);
      toast.success("تم حذف الموعد بنجاح");
    } catch (err) {
      console.log(err);
      toast.error("تعذر حذف الموعد");
    }
  }

  useEffect(() => {
    if (userTokenAccess) {
      fetchAppointments();
    }
  }, [userTokenAccess]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
      <section className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 font-cairo">
            <i className="fa-solid fa-calendar-days mr-2"></i> المواعيد
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg"
            aria-label="إضافة موعد جديد"
          >
            <i className="fa-solid fa-plus ml-2"></i>
            إضافة موعد جديد
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 text-center">
            <p className="text-xl text-gray-600">
              <i className="fa-solid fa-hourglass-half mr-2"></i> جاري تحميل
              المواعيد...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-12 text-center">
            <p className="text-2xl text-gray-500 mb-4">
              <i className="fa-solid fa-ban mr-2"></i> لا توجد مواعيد
            </p>
            <p className="text-gray-600">ابدأ بإضافة أول موعد لك</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((a) => (
              <article
                key={a.id}
                className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <i className="fa-solid fa-calendar-days text-emerald-700"></i>
                      </div>
                      <p className="text-lg font-semibold text-emerald-800">
                        {a.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <i className="fa-solid fa-clock text-emerald-700"></i>
                      </div>
                      <p className="text-lg text-gray-700">{a.time}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <i className="fa-solid fa-location-dot text-emerald-700"></i>
                      </div>
                      <p className="text-lg text-gray-700">{a.location}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <i className="fa-solid fa-user-doctor text-emerald-700"></i>
                      </div>
                      <p className="text-lg text-gray-700">
                        {a.doctor_or_hospital}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-3">
                        <i className="fa-solid fa-thumbtack text-emerald-700"></i>
                      </div>
                      <p className="text-lg text-gray-700">
                        {a.appointment_type}
                      </p>
                    </div>
                  </div>
                </div>

                {a.notes_or_details && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-emerald-100 p-2 rounded-lg ml-2">
                        <i className="fa-solid fa-pen text-emerald-700"></i>
                      </div>
                      <p className="text-lg font-semibold text-emerald-800">
                        ملاحظات إضافية:
                      </p>
                    </div>
                    <p className="text-gray-700 pr-4">{a.notes_or_details}</p>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-emerald-100">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-100 cursor-pointer text-red-600 px-6 py-2 rounded-xl hover:bg-red-200 transition-all duration-300 font-semibold flex items-center"
                    aria-label="حذف الموعد"
                  >
                    <i className="fa-solid fa-trash ml-2"></i>
                    حذف الموعد
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
              aria-label="إغلاق"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <AddAppointment
              onSuccess={() => {
                fetchAppointments();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
