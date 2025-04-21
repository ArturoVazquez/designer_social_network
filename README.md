
# 🎨 Designer Social Network

Una red social pensada para diseñadores, donde los usuarios pueden registrarse, crear su perfil y compartir sus diseños con la comunidad. Desarrollada con Node.js, Express y MySQL, este proyecto integra funcionalidades como autenticación segura, subida de imágenes, relaciones entre usuarios y publicaciones, y una interfaz amigable con EJS.

---

## 🎥 Demo en video

[![Ver en YouTube](https://img.youtube.com/vi/ZUC_eRQoNGY/0.jpg)](https://www.youtube.com/watch?v=ZUC_eRQoNGY)

---

## 🚀 Tecnologías utilizadas

### Backend:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Multer](https://www.npmjs.com/package/multer) – subida de imágenes
- [Bcrypt](https://www.npmjs.com/package/bcrypt) – cifrado de contraseñas
- Morgan, Debug, Cookie-Parser, Http-Errors

### Frontend:
- HTML5, CSS3, JavaScript

---

## ✨ Funcionalidades

- Registro e inicio de sesión de diseñadores
- Cifrado seguro de contraseñas con Bcrypt
- Subida de imágenes de perfil y diseños (Multer)
- Publicación de diseños con descripción y metadatos
- Relación 1:N entre diseñadores y sus diseños
- Eliminación lógica (`is_deleted`)
- Vistas dinámicas con EJS

---

## 🖼️ Capturas de pantalla

### Página principal 
![Perfil](./public/assets/home.png)

### Pantalla de login  
![Login](./public/assets/login.png)

### Registro de diseñador  
![Registro](./public/assets/register.png)

### Feed de diseños publicados  
![Feed](./public/assets/list.png)

### Formulario para publicar un diseño  
![Publicar diseño](./public/assets/add.png)

### Perfil de diseñador  
![Perfil](./public/assets/design.png)

### Información diseños  
![Perfil](./public/assets/designinfo.png)

### Responsive
![Perfil](./public/assets/reponsive.png)

---

## 🗃️ Estructura de base de datos

```sql
CREATE DATABASE designer_social_network;
USE designer_social_network;

CREATE TABLE designer (
  designer_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  designer_name VARCHAR(40) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  designer_description VARCHAR(200),
  city VARCHAR(60),
  phone_number VARCHAR(20),
  email VARCHAR(100) NOT NULL UNIQUE,
  designer_img VARCHAR(100),
  designer_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE design (
  design_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  designer_id INT UNSIGNED NOT NULL,
  design_name VARCHAR(100) NOT NULL,
  orientation VARCHAR(60) NOT NULL,
  main_fabric VARCHAR(50),
  main_color VARCHAR(50),
  garment_type VARCHAR(50),
  design_description VARCHAR(200),
  design_img VARCHAR(100),
  design_is_deleted BOOLEAN NOT NULL DEFAULT 0,
  CONSTRAINT Fk_designer_id FOREIGN KEY (designer_id)
    REFERENCES designer(designer_id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ArturoVazquez/designer_social_network.git
cd designer_social_network

# Instalar dependencias
npm install

# Configurar la base de datos (ver más abajo)

# Iniciar el servidor en modo desarrollo
npm run dev
```

---

## ⚙️ Configuración de la base de datos

Configura tu conexión en un archivo como `config/db.js`:

```js
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "designer_social_network"
});
module.exports = connection;
```

### 📥 Script SQL

Puedes encontrar el script de creación de la base de datos aquí:  
[`/sql/designer_social_network.sql`](./sql/designer_social_network.sql)

---

## 📁 Estructura del proyecto

```
designer_social_network/
├── assets/               # Capturas para README
├── bin/
│   └── www
├── config/
│   └── db.js
├── public/
│   ├── images/
│   ├── stylesheets/
│   └── js/
├── routes/
│   ├── index.js
│   ├── designers.js
│   └── designs.js
├── sql/
│   └── bd_red_social.sql
├── views/
│   ├── layout.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── feed.ejs
│   └── profile.ejs
├── app.js
└── package.json
```

---

## ✅ Estado del proyecto

🟡 Proyecto en desarrollo con funcionalidades principales implementadas.

### Próximas mejoras sugeridas:
- Sistema de comentarios y "me gusta"
- Validaciones más robustas
- Roles de usuario (admin, diseñador)
- Subida segura con validación MIME

---

## 📬 Contacto

📧 [arturovazquez1995@gmail.com](mailto:arturovazquez1995@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/arturovazquezpaumard/)  
💻 [GitHub](https://github.com/ArturoVazquez)

---

## 📝 Licencia

Este proyecto fue creado con fines educativos y puede ser reutilizado y adaptado libremente con fines no comerciales.
