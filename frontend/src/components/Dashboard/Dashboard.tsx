import { useEffect, useState } from "react";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import {
  getActivities,
  createActivity,
  updateActivity,
  updateActivityStatus,
  deleteActivity,
} from "../../services/activity";
import { useNavigate } from "react-router-dom";

interface Activity {
  id: number;
  title: string;
  description: string;
  day: string;
  status: "pendiente" | "completada";
}

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editActivity, setEditActivity] = useState<Activity | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await getActivities();
      setActivities(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Error al cargar actividades");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (data: { title: string; description: string; day: string }) => {
    try {
      await createActivity(data);
      setShowForm(false);
      fetchActivities();
    } catch {
      setError("Error al crear actividad");
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditActivity(activity);
    setShowForm(true);
  };

  const handleUpdate = async (data: { title: string; description: string; day: string }) => {
    if (!editActivity) return;
    try {
      await updateActivity(editActivity.id, data);
      setEditActivity(null);
      setShowForm(false);
      fetchActivities();
    } catch {
      setError("Error al actualizar actividad");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Eliminar esta actividad?")) return;
    try {
      await deleteActivity(id);
      fetchActivities();
    } catch {
      setError("Error al eliminar actividad");
    }
  };

  const handleToggleStatus = async (id: number, status: "pendiente" | "completada") => {
    try {
      await updateActivityStatus(id, status);
      fetchActivities();
    } catch {
      setError("Error al cambiar estado");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditActivity(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center rounded-2xl shadow-lg mb-10 animate-fade-in">
          <span className="font-bold text-xl tracking-wide flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Panel de Actividades
          </span>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold shadow transition"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mis Actividades</h1>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => {
              setEditActivity(null);
              setShowForm(true);
            }}
          >
            + Nueva Actividad
          </button>
        </div>
        {error && <div className="mb-4 text-red-500 bg-red-100 px-4 py-2 rounded">{error}</div>}
        {showForm && (
          <div className="mb-8 animate-fade-in">
            <ActivityForm
              initialData={editActivity || undefined}
              onSubmit={editActivity ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </div>
        )}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Cargando...</div>
        ) : (
          <ActivityList
            activities={activities}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}