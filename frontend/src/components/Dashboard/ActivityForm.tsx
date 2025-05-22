import { useState, useEffect } from "react";

interface ActivityFormProps {
  initialData?: {
    title: string;
    description: string;
    day: string;
  };
  onSubmit: (data: { title: string; description: string; day: string }) => void;
  onCancel?: () => void;
}

const daysOfWeek = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

export default function ActivityForm({
  initialData,
  onSubmit,
  onCancel,
}: ActivityFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [day, setDay] = useState(initialData?.day || daysOfWeek[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDay(initialData.day);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !day) {
      setError("El título y el día son obligatorios");
      return;
    }
    setError("");
    onSubmit({ title, description, day });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto border border-blue-100 animate-fade-in"
    >
      <h3 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        {initialData ? "Editar Actividad" : "Nueva Actividad"}
      </h3>
      {error && (
        <div className="mb-2 text-red-500 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}
      <input
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {daysOfWeek.map((d) => (
          <option key={d} value={d}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          type="submit"
        >
          {initialData ? "Guardar" : "Crear"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Cancelar
          </button>
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
    </form>
  );
}