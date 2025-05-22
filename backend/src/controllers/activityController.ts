import { Request, Response } from 'express';
import { openDb } from '../database/sqlite';
import { Activity } from '../models/activity';

export async function getActivities(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const db = await openDb();
    const activities = await db.all<Activity[]>('SELECT * FROM activities WHERE user_id = ?', userId);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener actividades' });
  }
}

export async function createActivity(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { title, description, day } = req.body;
    if (!title || !day) return res.status(400).json({ message: 'Título y día requeridos' });

    const db = await openDb();
    await db.run(
      'INSERT INTO activities (user_id, title, description, day, status, created_at) VALUES (?, ?, ?, ?, "pendiente", datetime("now"))',
      userId, title, description, day
    );
    res.status(201).json({ message: 'Actividad creada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear actividad' });
  }
}

export async function updateActivityStatus(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { status } = req.body;
    if (!['pendiente', 'completada'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    const db = await openDb();
    const result = await db.run(
      'UPDATE activities SET status = ? WHERE id = ? AND user_id = ?',
      status, id, userId
    );
    if (result.changes === 0) return res.status(404).json({ message: 'Actividad no encontrada' });
    res.json({ message: 'Estado actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado' });
  }
}

export async function deleteActivity(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const db = await openDb();
    const result = await db.run('DELETE FROM activities WHERE id = ? AND user_id = ?', id, userId);
    if (result.changes === 0) return res.status(404).json({ message: 'Actividad no encontrada' });
    res.json({ message: 'Actividad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar actividad' });
  }
}

export async function updateActivity(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { title, description, day } = req.body;
    const db = await openDb();
    await db.run(
      'UPDATE activities SET title = ?, description = ?, day = ? WHERE id = ? AND user_id = ?',
      title, description, day, id, userId
    );
    res.json({ message: 'Actividad actualizada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar actividad' });
  }
}