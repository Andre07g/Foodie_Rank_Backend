# 🍽️ Foodie Rank - Backend

## 📖 Descripción del proyecto
**Foodie Rank** es una aplicación full-stack que permite a los usuarios registrar, calificar y rankear restaurantes y platos.  
El backend está desarrollado completamente en **Node.js con Express**, implementando autenticación segura, validaciones robustas y control de acceso por roles (usuarios y administradores).  
El sistema incluye gestión de reseñas, denuncias, solicitudes, categorías, restaurantes, platos y usuarios.

El frontend consume esta API de manera independiente y está desarrollado en **HTML, CSS y JavaScript puro**.

---

## ⚙️ Tecnologías usadas
- **Node.js** + **Express.js**
- **MongoDB (Driver oficial)**
- **JWT (passport-jwt, jsonwebtoken)**
- **bcrypt** para el cifrado de contraseñas
- **dotenv** para manejar variables de entorno
- **express-rate-limit** para limitar peticiones
- **express-validator** para validar datos de entrada
- **swagger-ui-express** para la documentación interactiva de la API
- **SemVer** para versionado del API

---

## 🧩 Arquitectura del proyecto

```
Foodie_rank_backend/
├── src/
│   ├── config/                 # Configuración (ej. conexión a la base de datos)
│   ├── controllers/            # Controladores que manejan la lógica de las peticiones
│   ├── dtos/                   # Data Transfer Objects: validación y estructura de datos
│   ├── middlewares/            # Middlewares: validaciones, autenticación, permisos
│   ├── routers/                # Definición de rutas/endpoints
│   ├── schemas/                # Esquemas de validación con express-validator
│   ├── services/               # Capa de servicios: lógica de negocio y conexión con la BD
│   ├── utils/                  # Funciones auxiliares reutilizables
├── .gitignore
├── .test_env
├── CHANGELOG.md
└── README.md
```

---

## 🚀 Pasos para instalar y ejecutar

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Andre07g/Foodie_Rank_backend.git
cd Foodie_Rank_backend
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/foodie_rank
JWT_SECRET=tu_clave_secreta
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### 4️⃣ Ejecutar el servidor
Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

El servidor se ejecutará por defecto en: [http://localhost:4000](http://localhost:4000)

---

## 🧠 Funcionalidades clave

- ✅ Autenticación con **JWT** usando `passport-jwt`
- 🔒 Cifrado de contraseñas con **bcrypt**
- 🧾 Validación de datos con **express-validator**
- 🧱 Limitación de peticiones con **express-rate-limit**
- ⚡ Persistencia en **MongoDB** con transacciones reales para operaciones críticas
- 📚 Documentación con **Swagger UI**
- 🧍 Gestión de roles (**usuario**, **administrador**)
- 🏁 Versionado de API con **semver**
- 💬 CRUD completo para:
  - Usuarios
  - Restaurantes
  - Platos
  - Categorías
  - Reseñas
  - Solicitudes

---

## 📘 Documentación Swagger

La API está documentada con **Swagger UI**, disponible una vez el servidor esté corriendo en:

👉 [http://localhost:3000/api-docs](http://localhost:4000/api-docs)

Allí podrás probar todos los endpoints y visualizar los esquemas de entrada/salida.

---

## 🔗 Ejemplos de endpoints

### 🔐 Autenticación
**POST /api/v1/usuarios/login**
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```
**Respuesta:**
```json
{
  "token": "jwt_token_aqui",
  "usuario": {
    "id": "6723a6d4e55cc34e9f03fb91",
    "nombre": "Karol Reyes",
    "rol": "usuario"
  }
}
```

### 🍴 Restaurantes
**GET /api/v1/restaurantes** — obtiene todos los restaurantes  
**POST /api/v1/restaurantes** — crea un nuevo restaurante (requiere token y rol admin)

### ⭐ Reseñas
**POST /api/v1/reseñas** — crea una reseña para un restaurante o plato  
Incluye calificación, comentario y registro de likes/dislikes.

---

## 🧾 Versionado de la API
Este proyecto sigue el esquema **SemVer (Semantic Versioning)**.  
Ejemplo de versión: `v1.0.0`  
- **v1:** versión mayor (cambios incompatibles)  
- **0:** versión menor (nuevas funcionalidades)  
- **0:** parches (corrección de errores)

---

## 🧩 Base de datos
- Motor: **MongoDB**
- Conexión: usando el **driver oficial (`mongodb`)**, sin ORMs
- Manejo de **transacciones reales** para operaciones críticas
- Estructura modular por colección (usuarios, restaurantes, reseñas, etc.)

---

## 🌐 Frontend del proyecto

El frontend del proyecto se encuentra en un repositorio independiente y consume esta API.

🔗 [Repositorio del frontend - Foodie Rank](https://github.com/KarolainReyes/Foodie_Rank.git)

---

## 🧑‍💻 Autores
* [**Karol Reyes**](https://github.com/KarolainReyes) 
* [**Andres Leal**](https://github.com/Andre07g) 

Proyecto académico y práctico para la gestión y ranking de restaurantes y platos.

---

## 📄 Licencia
Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.
