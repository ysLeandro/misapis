# 🕷️ SpiderVerse – Sistema de Gestión (CRUD)

Proyecto CRUD completo inspirado en el **Spider-Verse**, desarrollado con **Node.js**, **Express**, **MongoDB** y un frontend en **HTML/CSS/JS**.  
Permite gestionar información de diferentes variantes de Spider-Man: crear, listar, actualizar y eliminar.

Este proyecto cumple con los requerimientos del examen:  
✔️ Backend con API REST (Node/Express/MongoDB)  
✔️ Frontend HTML/JS consumiendo la API  
✔️ CRUD completo  
✔️ Documentación y repositorio estructurado  

---

## 🚀 Tecnologías Utilizadas
### **Backend**
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- dotenv  
- Nodemon  

### **Frontend**
- HTML  
- CSS  
- JavaScript (fetch + async/await)  
- Bootstrap (para responsividad)

---

# 🛠️ Instalación y Ejecución del Proyecto

## 1️⃣ Clonar el repositorio

git clone https://github.com/ysLeandro/misapis.git
cd misapis

2️⃣ Instalar dependencias
bash
Copiar código
npm install

3️⃣ Configurar variables de entorno
Crear un archivo .env en la raíz con:

MONGO_URI=tu_uri_de_mongo
PORT=3000
(En el proyecto ya existen variables configuradas)

4️⃣ Ejecutar el Backend
bash
Copiar código
nodemon ./index.js
El servidor se inicia en:
http://localhost:3000

🕸️ Rutas de la API – SpiderVerse
Base URL
bash
Copiar código
/api/spiders
🔹 Obtener todos los Spiders
GET /api/spiders

🔹 Obtener un Spider por ID
GET /api/spiders/:id

🔹 Crear un nuevo Spider
POST /api/spiders

🔹 Actualizar un Spider
PUT /api/spiders/:id

🔹 Eliminar un Spider
DELETE /api/spiders/:id

La API usa los códigos de estado HTTP apropiados (200, 201, 400, 404).

🌐 Frontend – Cliente Web
El frontend se encuentra en:

Copiar código
/public/index.html
Es la página principal del sistema e incluye:

✔️ Listado dinámico de Spiders (GET)
✔️ Formulario para crear nuevos Spiders (POST)
✔️ Botón o sistema para editar (PUT)
✔️ Botón para eliminar (DELETE)
✔️ Diseño responsivo con Bootstrap
✔️ Manipulación del DOM con JS

El frontend se consume directamente desde:

Copiar código
http://localhost:3000
O abriendo el archivo public/index.html si se sirve como estático.

📁 Estructura del Proyecto

misapis/
│── controllers/
│   └── spider.controller.js
│── db/
│   └── cnn_mongodb.js
│── middleware/
│   └── validateObjectId.js (aún no se usa)
│── models/
│   └── spider.model.js
│── routes/
│   └── spider.routes.js
│── server/
│   └── server.js
│── public/
│   └── index.html   # Frontend
│── index.js         # Punto de entrada
│── package.json
│── .env
--Historial de Versiones--
El repositorio contiene commits significativos que muestran el desarrollo del proyecto, incluyendo: 

-Configuración inicial del servidor. 
-Conexión a MongoDB. 
-Creación de modelos y controladores. 
-Implementación de rutas CRUD. Manejo de validaciones. 
-Integración con frontend.

👤 Autor
Leandro Bautista
GitHub: https://github.com/ysLeandro
