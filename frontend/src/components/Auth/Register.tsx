import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await register({ username, password });
      setSuccess("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-blue-100 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 rounded-full p-3 mb-2 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.4 15a1.65 1.65 0 01-1.4.8H6a1.65 1.65 0 01-1.4-.8A7.97 7.97 0 0112 13c2.21 0 4.21.89 5.4 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
            Crear cuenta
          </h2>
          <p className="text-gray-500">Regístrate para comenzar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-center text-sm animate-shake">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-center text-sm animate-fade-in">
              {success}
            </div>
          )}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="username"
            >
              Usuario
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              <input
                id="username"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15a1.65 1.65 0 01-1.4.8H6a1.65 1.65 0 01-1.4-.8A7.97 7.97 0 0112 13c2.21 0 4.21.89 5.4 2z"
                  />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="confirm"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15a1.65 1.65 0 01-1.4.8H6a1.65 1.65 0 01-1.4-.8A7.97 7.97 0 0112 13c2.21 0 4.21.89 5.4 2z"
                  />
                </svg>
              </span>
              <input
                id="confirm"
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Confirmar contraseña"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition shadow"
            type="submit"
          >
            Registrarse
          </button>
          <button
            type="button"
            className="w-full mt-2 text-blue-600 hover:underline transition"
            onClick={() => navigate("/login")}
          >
            ¿Ya tienes cuenta?{" "}
            <span className="font-semibold">Inicia sesión</span>
          </button>
        </form>
      </div>
      {/* Animación fade-in */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-shake {
            animation: shake 0.3s;
          }
          @keyframes shake {
            10%, 90% { transform: translateX(-2px); }
            20%, 80% { transform: translateX(4px); }
            30%, 50%, 70% { transform: translateX(-8px); }
            40%, 60% { transform: translateX(8px); }
          }
        `}
      </style>
    </div>
  );
}