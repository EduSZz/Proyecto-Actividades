// src/routes/PrivateRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}