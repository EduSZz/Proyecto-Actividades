import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import activityRoutes from './routes/activityRoutes';
import { initDb } from './database/initDb';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Inicializar la base de datos
initDb()
  .then(() => {
    console.log('Base de datos inicializada');
  })
  .catch((err) => {
    console.error('Error al inicializar la base de datos:', err);
  });

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

// Ruta de prueba
app.get('/', (_req, res) => {
  res.send('API funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});