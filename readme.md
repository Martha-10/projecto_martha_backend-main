Proyecto de Tienda de Ropa Plus Size
¡Bienvenido al proyecto de la tienda de ropa sizeUp! Este proyecto es una aplicación web de una sola página (SPA) que permite a los usuarios navegar por un catálogo de productos, agregar artículos al carrito y gestionar sus pedidos.

🚀 Tecnologías
El proyecto está dividido en dos partes principales:

Frontend:

HTML: Estructura de la aplicación.

CSS: Estilos y diseño.

JavaScript (ESM): Lógica y enrutamiento.

Vite: Entorno de desarrollo y herramienta de construcción.

Backend:

Node.js: Entorno de ejecución del servidor.

Express: Framework para la creación de la API.

MySQL: Base de datos para almacenar productos, usuarios y pedidos.

CORS: Para permitir la comunicación entre el frontend y el backend.

Dotenv: Para gestionar variables de entorno de forma segura.

📦 Estructura del Proyecto
La aplicación sigue una arquitectura de capas, con una clara separación entre el frontend (interfaz de usuario) y el backend (lógica del servidor y base de datos).

frontend/: Contiene todo el código de la interfaz de usuario.

src/views/: Archivos que generan el HTML de cada página.

src/controllers/: Archivos que manejan la lógica y los eventos de cada página.

src/utils/: Funciones reutilizables para el manejo de estilos y el carrito de compras.

backend/: Contiene la API REST del servidor.

src/routes/: Define las rutas de la API.

src/controllers/: Contiene la lógica para cada ruta de la API.

src/models/: Gestiona la conexión y las operaciones con la base de datos.

⚙️ Cómo Correr el Proyecto
Sigue estos pasos para poner el proyecto en funcionamiento.

Paso 1: Configuración del Backend
Abre una terminal y navega hasta la carpeta backend/.

Instala las dependencias del backend:

```bash
npm install
```

Crea un archivo .env en la raíz de la carpeta backend/ y añade la configuración de tu base de datos (reemplaza los valores con los tuyos):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_2024
```
Importa el script SQL para crear la base de datos y las tablas. Puedes hacerlo usando una herramienta como phpMyAdmin o ejecutando el script ecommerce.sql en tu terminal de MySQL.

Inicia el servidor backend:

Bash

npm start
El servidor se ejecutará en http://localhost:3000.

Paso 2: Configuración del Frontend
Abre una nueva terminal y navega hasta la carpeta frontend/.

Instala las dependencias del frontend:

```bash
npm install
```

Inicia la aplicación frontend:

```bash
npm run dev
```
Abre tu navegador y navega a la URL que te proporcionó Vite (generalmente http://localhost:5173).

¡Listo! Con ambos servidores en funcionamiento, la aplicación estará lista para usarse.

Paso 3: Vistas y Rutas
La aplicación navega entre vistas usando rutas en el hash (#).