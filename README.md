# SpiderVerse API

API REST del Multiverso de Spiders, desarrollada con **Node.js**, **Express** y **MongoDB**.  
Permite gestionar información de diferentes Spider-Men del multiverso: crear, listar, actualizar y eliminar.

---

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Nodemon

---

##  Instalación del Proyecto

git clone https://github.com/ysLeandro/misapis.git
cd misapis

### 2- Instalar dependencias
npm install

### 3- Configurar variables de entorno

Crear un archivo .env en la raíz con: ( ya estan incluidas )
MONGO_URI=tu_uri_de_mongo
PORT=3000

### 3- Ejecución del Backend

Para iniciar el servidor con Nodemon:
nodemon ./index.js

El servidor arrancará en:
http://localhost:3000

Rutas de la API – SpiderVerse

Base URL
/api/spiders

🔹 Obtener todos los Spiders
GET /api/spiders

🔹 Obtener un Spider por ID
GET /api/spiders/:id

🔹 Crear un Spider
POST /api/spiders

🔹 Actualizar un Spider
PUT /api/spiders/:id

🔹 Eliminar un Spider
DELETE /api/spiders/:id

📁 Estructura del Proyecto

misapis/
│── controllers/
│   └── spider.controller.js
│── db/
│   └── cnn_mongodb.js
│── middleware/
│   └── validateObjectId.js (aun no se lo usa)
│── models/
│   └── spider.model.js
│── routes/
│   └── spider.routes.js
│── server/
│   └── server.js
│── public/
│   └── index.html
│── index.js
│── package.json
│── .env

--Historial de Versiones--

El repositorio contiene commits significativos que muestran el desarrollo del proyecto, incluyendo:

Configuración inicial del servidor.

Conexión a MongoDB.

Creación de modelos y controladores.

Implementación de rutas CRUD.

Manejo de validaciones.

Integración con frontend.

- Autor
Leandro Bautista
GitHub: https://github.com/ysLeandro
