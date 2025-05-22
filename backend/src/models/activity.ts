export interface Activity {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  day: string; // Ejemplo: 'lunes', 'martes', etc.
  status: 'pendiente' | 'completada';
  created_at?: string;
}