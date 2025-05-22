# ActividadesES

## Descripción General
**ActividadesES** es una aplicación web full-stack que permite a los usuarios gestionar sus actividades diarias. Incluye registro y autenticación de usuarios, así como un panel para crear, editar, completar y eliminar actividades.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: **backend** y **frontend**.

---

### Backend

El backend está construido con **Node.js**, **Express** y **TypeScript**, utilizando **SQLite** como base de datos.

- **src/**
  - **controllers/**: Lógica de negocio.
    - `activityController.ts`: CRUD de actividades.
    - `userController.ts`: Operaciones de usuario.
  - **models/**: Definición de interfaces de datos.
    - `activity.ts`: Interfaz de Actividad.
    - `user.ts`: Interfaz de Usuario.
  - **routes/**: Rutas de la API.
    - `activityRoutes.ts`: Rutas para actividades.
    - `userRoutes.ts`: Rutas para usuarios.
  - **middleware/**: Funciones middleware.
    - `auth.ts`: Autenticación JWT.
  - **database/**: Conexión y gestión de SQLite.
    - `sqlite.ts`: Inicialización y conexión.
  - **types/**: Tipos TypeScript globales.
    - `index.ts`: Exporta tipos usados en la app.
  - `app.ts`: Punto de entrada del backend.

---

### Frontend

El frontend está construido con **React**, **TypeScript** y **Tailwind CSS**. Proporciona una interfaz moderna y responsiva para interactuar con el backend.

- **src/**
  - **components/**
    - **Auth/**
      - `Login.tsx`: Formulario de inicio de sesión.
      - `Register.tsx`: Formulario de registro.
    - **Dashboard/**
      - `Dashboard.tsx`: Panel principal de actividades.
      - `ActivityForm.tsx`: Formulario para crear/editar actividades.
      - `ActivityList.tsx`: Lista de actividades.
  - **services/**: Servicios para consumir la API.
    - `auth.ts`: Autenticación y registro.
    - `activity.ts`: Operaciones sobre actividades.
    - `api.ts`: Configuración de Axios.
  - **routes/**
    - `PrivateRoute.tsx`: Protección de rutas privadas.
  - `App.tsx`: Definición de rutas principales.
  - `main.tsx`: Punto de entrada de React.
  - `index.css`: Estilos globales (Tailwind).

---

## Funcionalidades

- Registro y autenticación de usuarios (JWT).
- Panel de actividades por usuario.
- Crear, editar, completar y eliminar actividades.
- Interfaz moderna, responsiva y fácil de usar.

---

## Instrucciones de Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   ```

2. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   El backend estará disponible en [http://localhost:3000](http://localhost:3000)

3. **Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   El frontend estará disponible en [http://localhost:5173](http://localhost:5173)

---

## Contribución

¡Sugerencias y mejoras son bienvenidas! Puedes abrir issues o pull requests.

---

## Licencia

MIT

---

**ActividadesES** — Tu gestor de actividades simple, moderno y seguro.