import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { openDb } from '../database/sqlite';
import { User } from '../models/user';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Usuario y contraseña requeridos' });

    const db = await openDb();
    const existing = await db.get<User>('SELECT * FROM users WHERE username = ?', username);
    if (existing) return res.status(409).json({ message: 'El usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (username, password, created_at) VALUES (?, ?, datetime("now"))', username, hashed);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Usuario y contraseña requeridos' });

    const db = await openDb();
    const user = await db.get<User>('SELECT * FROM users WHERE username = ?', username);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

// Correcto: sin tipo de retorno explícito
export async function getActivities(req: Request, res: Response) {
  // ...
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { username, password } = req.body;
    const db = await openDb();

    if (username) {
      await db.run('UPDATE users SET username = ? WHERE id = ?', username, userId);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      await db.run('UPDATE users SET password = ? WHERE id = ?', hashed, userId);
    }
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
}