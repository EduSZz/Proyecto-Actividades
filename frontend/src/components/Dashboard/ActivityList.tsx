interface Activity {
  id: number;
  title: string;
  description: string;
  day: string;
  status: "pendiente" | "completada";
}

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, status: "pendiente" | "completada") => void;
}

export default function ActivityList({
  activities,
  onEdit,
  onDelete,
  onToggleStatus,
}: ActivityListProps) {
  if (activities.length === 0) {
    return <div className="text-gray-500 text-center py-8">No hay actividades.</div>;
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-2xl shadow-lg border-l-4 ${
            activity.status === "completada"
              ? "border-green-400 opacity-70 line-through"
              : "border-blue-400"
          } animate-fade-in`}
        >
          <div>
            <div className="font-semibold text-xl mb-1 flex items-center gap-2">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  activity.status === "completada" ? "bg-green-400" : "bg-yellow-400"
                }`}
              ></span>
              {activity.title}
            </div>
            <div className="text-gray-600 mb-1">{activity.description}</div>
            <div className="text-sm text-gray-400 mb-1">Día: {activity.day}</div>
            <div className="text-sm">
              Estado:{" "}
              <span
                className={
                  activity.status === "completada"
                    ? "text-green-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {activity.status}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              className={`px-4 py-1 rounded-lg font-semibold shadow ${
                activity.status === "pendiente"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              } transition`}
              onClick={() =>
                onToggleStatus(
                  activity.id,
                  activity.status === "pendiente" ? "completada" : "pendiente"
                )
              }
            >
              {activity.status === "pendiente" ? "Terminar" : "Reabrir"}
            </button>
            <button
              className="px-4 py-1 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
              onClick={() => onEdit(activity)}
            >
              Editar
            </button>
            <button
              className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
              onClick={() => onDelete(activity.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
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