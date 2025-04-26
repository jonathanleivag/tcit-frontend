# TCIT - Frontend

<p align="center">
  <img src="./public/logo.webp" alt="Logo TCIT" width="300"/>
</p>

## 🧰 Tecnologías principales

- **Vite** — Bundler ultrarrápido para aplicaciones web
- **React 19** — Librería para construir interfaces de usuario
- **TypeScript** — Superset de JavaScript tipado
- **Tailwind CSS 4** — Framework de utilidades para estilos
- **Redux** — Manejo de estado global
- **Formik** — Manejo de formularios en React
- **Yup** — Validación de formularios
- **Framer Motion** — Animaciones declarativas para React
- **React Hot Toast** — Notificaciones modernas
- **React Icons** — Librería de íconos SVG
- **ESLint** y **Prettier** — Análisis y formateo de código

## 🧩 Requisitos

Este proyecto fue desarrollado con la versión:

```bash
Node.js v22.15.0
```

Se recomienda utilizar [Volta](https://volta.sh) o [nvm](https://github.com/nvm-sh/nvm) para gestionar versiones de Node.

## 📁 Estructura del proyecto

```
.
├── public/                       # Recursos públicos (imágenes, favicon, etc.)
├── src/
│   ├── components/              # Componentes de UI
│   │   └── shared/              # Elementos compartidos
│   ├── features/                # Feature slices u organización por dominio
│   ├── hooks/                   # Hooks personalizados
│   ├── utils/                   # Funciones de utilidad
│   ├── App.tsx                  # Componente principal de la app
│   ├── enum.ts                  # Enums globales
│   ├── global.css               # Estilos globales
│   ├── main.tsx                 # Punto de entrada principal
│   ├── store.ts                 # Configuración de Redux Toolkit
│   ├── type.d.ts                # Tipos globales
│   ├── validationSchema.ts      # Esquemas de validación Yup
│   └── vite-env.d.ts            # Tipado de variables de entorno
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## ⚙️ Instalación y configuración

1. Clona el repositorio:

```bash
git clone https://github.com/jonathanleivag/tcit-frontend.git
cd tcit-frontend
```

2. Instala las dependencias:

```bash
npm i
```

3. Configura las variables de entorno:

```bash
cp .env.example .env
```

## 📄 Variables de entorno

Debes crear un archivo `.env` en la raíz del proyecto. Puedes usar `.env.example` como plantilla.

### Variables necesarias

```env
VITE_ENDPOINT="<your_endpoint>"
```

- `VITE_ENDPOINT`: URL base para las llamadas al backend desde Vite ejemplo: http://localhost:3001/api, recuerde que es necesario el '/api' despues de la URL.

4. Ejecuta la aplicación en modo desarrollo:

```bash
npm run dev
```

## 🚀 Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila el proyecto para producción
- `npm run start` — Inicia el servidor de la aplicación ya compilada

---

🔗 [Repositorio del Backend](https://github.com/jonathanleivag/tcit-backend.git)
