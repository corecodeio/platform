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

In our workspaces, we will have 2 projects:

- api: general backend of the platform with different paths for each frontend:
    - endpoint for each frontend with different functionalities and validation of permissions and roles.
    - data centralization (DB).
    - connection with the different APIs to use:
        - Google Calendar (Google API).
        - WhatsApp (Meta for Developers).
        - Slack (Slack API).
- frontend: frontend for students of the platform. Among its main functions will be:
    - sign Up and log In of new applicants.
    - Information validation:
        - Phone using WhatsApp verification code.
        - GitHub authentication to get user and be able to invite to course repositories.
        - LinkedIn.
    - Centralized Teaching Dashboard:
        - States of the current process.
        - Attendance information and event schedules on Zoom and Google Calendar.
        - Generalized information of the enrolled course.
    - Administration dashboard:
        - Creation of new courses.
        - System of roles and permissions for the different types of accounts.
        - Dashboard for the administration of the different APIs and generated courses.

## 3. Setting environment variables

In each project, you need an .env file. Here we will leave records of the name of these variables
for each project individually:

### frontend:

```bash
    PORT=3500
    REACT_APP_BACKEND_URL=http://localhost:3001
```

### api:
- Variable necessary for all configurations of the api project more details of everything in its [README](/api/README.md)

```bash
    #Server configurations
    PORT=3001
    SERVER_MODE=dev
    CLIENT_URL=http://localhost:3500
    SERVER_DEVELOPMENT_USER_ID=
    CHANNEL_SLACK_CELEBRATION=
    CALENDAR_CELEBRATION_ID=
    #Stytch configurations
    STYTCH_PROJECT_ID=
    STYTCH_SECRET=
    #Database configurations
    SERVER_DB_USER=
    SERVER_DB_PASS=
    SERVER_DB_HOST=
    SERVER_DB_PORT=
    SERVER_DB_NAME=
    #slack configurations
    SLACK_BOT_USER_OAUTH_TOKEN=
    SLACK_APP_LEVEL_TOKEN=
    SERVER_MODE_SLACK=
    #google calendar configurations
    GOOGLE_CLIENT_ID=
    GOOGLE_SECRET_CLIENT=
    GOOGLE_REFRESH_TOKEN=
    ##react
    REACT_APP_BACKEND_URL=http://localhost:3001
```

## 4. Scripts

```javascript
    "build": "yarn workspace frontend build",
    "start": "yarn workspace api start",
    "dev:api": "yarn workspace api dev",
    "start:frontend": "yarn workspace frontend start"
```

## 5. Structure styles

The project is currently using module.css, but will switch to Tailwinds. The dependencies to implement in the frontend project are already installed. [more information](https://tailwindcss.com)

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
- frontend: [README](/frontend/README.md)