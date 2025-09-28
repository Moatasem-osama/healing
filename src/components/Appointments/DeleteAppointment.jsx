import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

export default function DeleteAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete this appointment?")) return;

    try {
      await api.delete("/appointments/all/", {data: { id }});
      toast.success("✅ Appointment deleted successfully!");
      navigate("/appointments");
    } catch (err) {
      console.error("❌ Error deleting appointment:", err.response?.data || err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">🗑 Delete Appointment</h2>
      <p>Are you sure you want to delete appointment with ID: <b>{id}</b>?</p>
      <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded mt-3">
        ❌ Confirm Delete
      </button>
    </div>
  );
}
