import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";

export default function EditAppointment() {
  const { userTokenAccess } = useContext(userContext);
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/appointments/all/", {
          headers: { Authorization: `Bearer ${userTokenAccess}` },
        });
        const appointment = res.data.find((a) => String(a.id) === id);
        setForm(appointment);
      } catch (err) {
        console.error("❌ Error fetching appointment:", err);
      }
    };
    fetchData();
  }, [id, userTokenAccess]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/appointments/all/", { ...form, id });
      alert("✅ Appointment updated successfully!");
    } catch (err) {
      console.error("❌ Error updating appointment:", err.response?.data || err);
    }
  };

  if (!form) return <p>⏳ Loading appointment...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md p-4">
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 w-full" />
      <input name="time" type="time" value={form.time} onChange={handleChange} className="border p-2 w-full" />
      <input name="location" value={form.location} onChange={handleChange} className="border p-2 w-full" />
      <input name="appointments_to" value={form.appointments_to} onChange={handleChange} className="border p-2 w-full" />
      <textarea name="notes_or_details" value={form.notes_or_details} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">✏ Update</button>
    </form>
  );
}
