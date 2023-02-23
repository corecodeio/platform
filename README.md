# platform

<a href="https://www.core-code.io/">

![alt text](./src/images/logo.png 'corecodeio') </a>

<h1 align="center">Platform</h1>

## Index

1. [Introduction](#1-introduction)
2. [Workspaces](#2-workspaces)
3. [Environment Variables](#3-environment-variables)
4. [Scripts](#4-scripts)

---

## 1. Introduction 🚀

Bienvenido/a al repositorio 'Platform' de Core Code. Antes de poder iniciar el repositorio de forma
local, es necesario realizar ciertas configuraciones para su utilización. Además, nos gustaría
brindarte algunos recursos que te ayuden a comprender mejor cada parte del proceso. Esperamos que
disfrutes y aprendas mucho de este repositorio, cuya finalidad principal es proporcionar una
experiencia laboral real a nuestros graduados en el mundo del desarrollo.

## 2. Workspaces

Desde la versión 7, npm tiene soporte para espacios de trabajo (workspace), lo que facilita mucho el
proceso de desarrollo. Un ejemplo de ello es la unificación al momento de instalar dependencias.
Anteriormente, si en un repositorio se usaban varias carpetas de proyectos, se tenía que instalar
las dependencias carpeta por carpeta de proyecto:

```
    npm install
```

Con esta unificación, solo es necesario hacer la instalación una vez en el proyecto principal,
mediante un archivo package.json que unifica todo, sin quitar el archivo package.json individual de
cada proyecto. Esto también se aplica a los scripts.

Si deseas saber más sobre los workspaces, te dejamos un enlace [aquí](https://www.youtube.com/watch?v=KEkRy4q_0oI)

En nuestros espacios de trabajo, tendremos 3 proyectos:

-   api: backend general de la plataforma con diferentes rutas para cada frontend:
    -   endpoint para cada frontend con diferentes funcionalidades y validación de permisos y roles.
    -   centralización de datos (DB).
    -   conexión con las diferentes APIs a utilizar:
        -   Google Calendar (Google API).
        -   WhatsApp (Meta for Developers).
        -   Slack (Slack API).
-   student-app: frontend para estudiantes de la plataforma. Entre sus funciones principales
    estarán: -sign Up y log In de nuevos aplicantes.
    -   Validación de información:
        -   Teléfono mediante WhatsApp.
        -   GitHub.
        -   LinkedIn.
    -   Dashboard centralizado de enseñanza:
        -   Estados del proceso actual.
        -   Información de asistencias y cronogramas de eventos en Zoom y Google Calendar.
        -   Información generalizada del curso inscripto.
-   management-app: frontend para la parte administrativa. Funciones:
    -   Creación de nuevos cursos.
    -   Sistema de roles y permisos para los diferentes tipos de cuentas.
    -   Dashboard para la administración de las diferentes APIs y cursos generados.

## 3. Environment Variables
En cada proyecto, necesitas un archivo .env. Aquí dejaremos registros del nombre de estas variables para cada proyecto individualmente:
student-app:
```
    PORT=3500
```
management-app:
```
    PORT=4000
```
api:
```
    #Server configurations
    SERVER_PORT=
    #Database configurations
    SERVER_DB_USER=
    SERVER_DB_PASS=
    SERVER_DB_HOST=
    SERVER_DB_PORT=
    SERVER_DB_NAME=
    #URL frontend configurations
    CLIENT_STUDENT_URL=http://localhost:3500/
    CLIENT_MANAGEMENT_URL=http://localhost:4000/
```

## 4. Scripts

```javascript
        "start:api": "npm run start --workspace=api",
        "dev:api": "npm run dev --workspace=api",
        "start:student": "npm run start --workspace=student-app",
        "build:student": "npm run build --workspace=student-app",
        "start:management": "npm run start --workspace=management-app",
        "build:management": "npm run build --workspace=management-app"
```
