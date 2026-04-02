# 💻 ToDo Frontend (React + Vite)

**ToDo Client** es la interfaz de usuario moderna para la gestión de tareas de la plataforma Ecotec.
Esta aplicación ha sido construida bajo una **Arquitectura Basada en Features**, permitiendo una separación clara entre la lógica de autenticación, la gestión de tareas y el estado global.

## 🛠 Tech Stack

- Framework: React 19 + Vite

- Lenguaje: TypeScript

- Gestión de Estado: Redux Toolkit (RTK)

- Cliente API: Axios (con interceptores para JWT)

- Enrutado: React Router Dom v7

- Validación: Yup

## 🧱 Arquitectura del Proyecto

El frontend utiliza una organización por Features, lo que facilita el mantenimiento y la escalabilidad:

- **API:** Configuración centralizada de Axios y servicios compartidos.

- **Features:** Módulos encapsulados (Auth, Tasks) que contienen sus propios hooks, páginas y lógica de estado.

- **Store:** Configuración central de Redux, combinando los slices de cada funcionalidad.

- **Shared:** Componentes reutilizables (Spinners, Errores) y utilidades globales.

- **Routes:** Gestión de navegación y guardias de seguridad (ProtectedRoute).

### 📁 Estructura de Carpetas

```bash
src/
 ├── api/                   # Configuración de Axios (interceptores 401)
 ├── features/              # Módulos por dominio
 │    ├── auth/             # Login, Registro, Hooks (useLogin)
 │    │    ├── apis/        # Llamadas a APIs auth (login, register)
 │    │    ├── hooks/       # useLogin, useRegister
 │    │    ├── interfaces/  # Response & request types
 │    │    ├── pages/       # LoginPage, RegisterPage
 │    │    ├── states/      # Redux slice(s) para autenticación   
 │    │    └── validations/ # Esquemas de validación de formularios
 │    └── tasks/            # Gestión de tareas y páginas
 ├── routes/                # Definición de rutas y ProtectedRoute.tsx
 ├── shared/                # Componentes comunes (Spinner, SharedError)
 ├── store/                 # Redux Store global y Hooks (useAppDispatch)
 └── main.tsx               # Punto de entrada y Provider
```

### 🔒 Seguridad y Flujo de Auth

La aplicación implementa un flujo de seguridad robusto:

1. Interceptor de Petición: Adjunta automáticamente el Bearer Token desde el localStorage.

2. Interceptor de Respuesta: Detecta errores 401 (Unauthorized), limpia la sesión y redirige al usuario al /login.

3. Rutas Protegidas: Los usuarios no autenticados no pueden acceder a /tasks ni a rutas internas del sistema.

### ⚙️ Instalación y Uso

1. Clonar el repositorio

```Bash
git clone <tu-repositorio-url>
cd frontend
```

2. Instalar dependencias

```Bash
npm install
```

3. Configurar variables de entorno

Crea un archivo .env en la raíz (puedes basarte en .env.example):

Fragmento de código
```
# URL base de tu backend de Fastify
VITE_TODO_BASE_URL="http://localhost:3000"
```

4. Correr en modo desarrollo

```Bash
npm run dev
```
La aplicación estará disponible en http://localhost:5173.

### 🧪 Scripts Disponibles
```npm run dev:``` Inicia el servidor de desarrollo con Hot Module Replacement (HMR).

```npm run build:``` Compila la aplicación para producción.

```npm run preview:``` Previsualiza localmente la versión de producción.

### 📌 Autor
**Edward Cruz** 

Software Developer - Frontend focused on Scalable Architecture.