<a href="https://www.core-code.io/">

![alt text](./src/images/logo.png 'corecodeio') </a>

<h1 align="center">Platform</h1>

## Index

1. [Introduction](#1-introduction)
2. [Workspaces](#2-workspaces)
3. [Setting environment variables](#3-setting-environment-variables)
4. [Scripts](#4-scripts)
5. [Structure styles](#5-structure-styles)
6. [Response structure in API](#6-response-structure-in-api)
7. [Recommended resources](#7-recommended-resources)
8. [README of the different projects](#8-readme-of-the-different-projects)

---

## 1. Introduction 🚀

Welcome to the Core Code 'Platform' repository. Before you can start the repository
local, it is necessary to perform certain configurations for its use. In addition, we would like
provide you with some resources to help you better understand each part of the process. We hope you can enjoy and learn a lot from this repository, whose main purpose is to provide a
real work experience to our graduates in the development world.

## 2. Workspaces

Since version 7, npm has support for "workspace", which makes it much easier to
development process. An example of this is unification when installing dependencies.
Previously, if multiple project folders were used in a repository, you had to install
the folder dependencies per project folder:

```
    npm install
```

With this unification, it is only necessary to do the installation once in the main project,
using one package.json file that unifies everything, without removing the individual package.json file from each project. this also applies to scripts.

En nuestros espacios de trabajo, tendremos 3 proyectos:

- api: general backend of the platform with different paths for each frontend:
    - endpoint for each frontend with different functionalities and validation of permissions and roles.
    - data centralization (DB).
    - connection with the different APIs to use:
        - Google Calendar (Google API).
        - WhatsApp (Meta for Developers).
        - Slack (Slack API).
-   student-app: frontend for students of the platform. Among its main functions will be:
    - sign Up and log In of new applicants.
    - Information validation:
        - Phone using WhatsApp verification code.
        - GitHub authentication to get user and be able to invite to course repositories.
        - LinkedIn.
    - Centralized Teaching Dashboard:
        - States of the current process.
        - Attendance information and event schedules on Zoom and Google Calendar.
        - Generalized information of the enrolled course.
-   management-app: frontend for the administrative part. functions:
    - Creation of new courses.
    - System of roles and permissions for the different types of accounts.
    - Dashboard for the administration of the different APIs and generated courses.

## 3. Setting environment variables

In each project, you need an .env file. Here we will leave records of the name of these variables
for each project individually:

### student-app:

```bash
    PORT=3500
```

### management-app:

```bash
    PORT=4000
```

### api:
- Variable necessary for all configurations of the api project more details of everything in its [README](/api/README.md)

```bash
    #Server configurations
    SERVER_PORT=3001
    SERVER_MODE=
    #User / Staff Testing
    SERVER_DEVELOPMENT_USER_FIRST_NAME=
    SERVER_DEVELOPMENT_USER_LAST_NAME=
    SERVER_DEVELOPMENT_USER_COUNTRY=
    SERVER_DEVELOPMENT_USER_EMAIL=
    SERVER_DEVELOPMENT_USER_PASSWORD=
    SERVER_DEVELOPMENT_USER_PHONE=
    SERVER_DEVELOPMENT_USER_SLACK_ID=
    #Course Testing
    SERVER_DEVELOPMENT_COURSE_NAME=
    SERVER_DEVELOPMENT_COURSE_SLACK_ID=
    SERVER_DEVELOPMENT_COURSE_NAME_SLACK=
    SERVER_DEVELOPMENT_COURSE_CALENDAR_ID=
    SERVER_DEVELOPMENT_COURSE_CALENDAR_NAME=
    #Database configurations
    SERVER_DB_USER=
    SERVER_DB_PASS=
    SERVER_DB_HOST=
    SERVER_DB_PORT=
    SERVER_DB_NAME=
    #Frontend configurations
    CLIENT_STUDENT_URL=http://localhost:3500
    CLIENT_MANAGEMENT_URL=http://localhost:4000
    #slack configurations
    SLACK_BOT_USER_OAUTH_TOKEN=
    SLACK_APP_LEVEL_TOKEN=
    SERVER_MODE_SLACK=
    #google calendar configurations
    GOOGLE_CLIENT_ID=
    GOOGLE_SECRET_CLIENT=
    GOOGLE_REFRESH_TOKEN=
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

## 5. Structure styles

As it is a project open to students, it was decided to use react module.css, so that each view or component has its own separate style and revisions are easier.

![css module](./src/images/css-module.png 'css module')

To adjust the styles to each resolution, media queries will be used:
- default style for views larger than 1440px.
- media query for views between 1440px and 1281px.
- media query for views between 1280px and 801px.
- media query for views 800px or less.

```css
@media only screen and (max-width: 1440px) and (min-width: 1281px) {
}
@media only screen and (max-width: 1280px) and (min-width: 801px) {
}
@media only screen and (max-width: 800px) {
}
```

## 6. Response structure in API

Responses from API endpoints must meet certain parameters.
- return a json.
- include the "successful" variable with true if the endpoint succeeds or false if it fails for any reason.
- the "message" variable, if included, must be in lowercase and without a period at the end

example:
```javascript
            res.status(200).json({
                successful: true,
                message: 'login successful'
            });
```

## 7. Recommended resources

[Here](https://www.youtube.com/watch?v=KEkRy4q_0oI) workspaces

## 8. README of the different projects

- api: [README](/api/README.md)
- student-app: [README](/student-app/README.md)
- management-app: [README](/management-app/README.md)