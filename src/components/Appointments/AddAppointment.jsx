import { useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function AddAppointment({ onSuccess }) {
  const { userTokenAccess } = useContext(userContext);

  const [form, setForm] = useState({
    date: "",
    time: "",
    location: "",
    name: "",
    appointment_type: "regular",
    notes_or_details: "",
  });

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

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
      if (onSuccess) onSuccess(); // ✅ بعد الإضافة
    } catch (err) {
      console.error("❌ Error adding appointment:", err.response?.data || err);
    }
  };


  return (
      <div className=" my-12 py-12 px-6">
        <div className="flex justify-center items-center py-8  bg-gradient-to-br from-emerald-50 to-green-50">
  <div className="max-w-lg w-full bg-white rounded-xl shadow-md border border-emerald-100 p-6">
    <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center font-cairo">
      <i className="fa fa-plus"></i> اضافة موعد جديد
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-emerald-700 mb-2">
            📅 التاريخ
          </label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium text-emerald-700 mb-2">
            ⏰ الوقت
          </label>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-emerald-700 mb-2">
          📍 الموقع
        </label>
        <input
          name="location"
          placeholder="أدخل موقع الموعد..."
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-emerald-700 mb-2">
          👨‍⚕️ الطبيب / المستشفى
        </label>
        <input
          name="name"
          placeholder="أدخل اسم الطبيب أو المستشفى..."
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-emerald-700 mb-2">
          📌 نوع الموعد
        </label>
        <select
          name="appointment_type"
          value={form.appointment_type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
        <label className="block text-base font-medium text-emerald-700 mb-2">
          📝 ملاحظات إضافية
        </label>
        <textarea
          name="notes_or_details"
          placeholder="أدخل أي ملاحظات أو تفاصيل إضافية..."
          value={form.notes_or_details}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          <i className="fa fa-plus"></i> اضافة الموعد
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  );
}
