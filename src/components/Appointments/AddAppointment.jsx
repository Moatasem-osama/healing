import { useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function AddAppointment() {
  const { userTokenAccess } = useContext(userContext);
  const [form, setForm] = useState({
    date: "",
    time: "",
    location: "",
    name: "",
    appointment_type: "regular",
    notes_or_details: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments/all/", form, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      toast.success("تم إضافة الموعد بنجاح!");
      setForm({
        date: "",
        time: "",
        location: "",
        name: "",
        appointment_type: "regular",
        notes_or_details: "",
      });
    } catch (err) {
      console.error("❌ Error adding appointment:", err.response?.data || err);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
        <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center font-cairo"><i className="fa fa-plus"></i> اضافة موعد جديد</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-emerald-700 mb-3">📅 التاريخ</label>
              <input 
                name="date" 
                type="date" 
                value={form.date} 
                onChange={handleChange} 
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                required 
              />
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-emerald-700 mb-3">⏰ الوقت</label>
              <input 
                name="time" 
                type="time" 
                value={form.time} 
                onChange={handleChange} 
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">📍 الموقع</label>
            <input 
              name="location" 
              placeholder="أدخل موقع الموعد..." 
              value={form.location} 
              onChange={handleChange} 
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">👨‍⚕️ الطبيب / المستشفى</label>
            <input 
              name="name" 
              placeholder="أدخل اسم الطبيب أو المستشفى..." 
              value={form.name} 
              onChange={handleChange} 
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">📌 نوع الموعد</label>
            <select 
              name="appointment_type" 
              value={form.appointment_type} 
              onChange={handleChange} 
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            >
              <option value="medical">طبي</option>
              <option value="regular">عادي</option>
              <option value="follow-up">متابعة</option>
              <option value="emergency">طوارئ</option>
              <option value="annual">سنوي</option>
              <option value="consultation">استشارة</option>
              <option value="diagnostic">تشخيصي</option>
              <option value="procedure">إجراء طبي</option>
              <option value="second_opinion">رأي ثاني</option>
              <option value="telemedicine">طب عن بعد</option>
              <option value="physical_exam">فحص بدني</option>
              <option value="group_session">جلسة جماعية</option>
              <option value="home_visit">زيارة منزلية</option>
              <option value="virtual">افتراضي</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-emerald-700 mb-3">📝 ملاحظات إضافية</label>
            <textarea 
              name="notes_or_details" 
              placeholder="أدخل أي ملاحظات أو تفاصيل إضافية..." 
              value={form.notes_or_details} 
              onChange={handleChange} 
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg"
            >
              <i className="fa fa-plus"></i> اضافة الموعد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
