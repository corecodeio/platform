# API

This is the backend of the Core Code Platform system.

## Content

Controller backend of our user frontend (student-app) and management frontend (management-app). The project is carried out in:

-   Node.js

-   express.js

-   sequelize (with Postgres database)

## Necessary programs

To be able to use the project in localhost it is necessary to clone and have some programs:

- [Nodejs](https://nodejs.org/es/download/) v18.12.1 Higher.
- [PostgreSQL](https://www.postgresql.org/download/) PostgreSQL (can be optional, sequelize
    allows you to configure other databases).
- Development IDE of your convenience Example [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) for APIS testing. (Optional)
- [Git](https://git-scm.com/downloads) to be able to manage the versions.

## How to clone

As the project is in a workspaces we will clone everything:

```bash
cd existing_folder
git clone https://github.com/corecodeio/platform.git

```

## Installation 

As the project is in a workspace we will install the dependencies of all the projects locating ourselves in the main directory or if we want only the backend positioning ourselves in "/api":

```bash
npm install
```

### Private keys:

We will create a file called .env positioned in "/api"

```bash
#Server configurations
SERVER_PORT=
SERVER_MODE=
#Database configurations
SERVER_DB_USER=
SERVER_DB_PASS=
SERVER_DB_HOST=
SERVER_DB_PORT=
SERVER_DB_NAME=
#URL frontend configurations
CLIENT_STUDENT_URL=
CLIENT_MANAGEMENT_URL=
#jwt configurations
JWT_SECRET_KEY_STUDENT=
JWT_EXPIRES_STUDENT=
JWT_SECRET_KEY_MANAGEMENT=
JWT_EXPIRES_MANAGEMENT=
#nodemailer configurations
NODE_MAILER_HOST=
NODE_MAILER_PORT=
NODE_MAILER_USER=
NODE_MAILER_PASSWORD=
```

To use SERVER_MODE, it must be completed with "dev", it is used to enable the force of sequelize (remove table exists , before it tries to create its own table), preloading of additional data and logs in the endpoints (morgan).

```bash
SERVER_MODE=dev
```

### Run en LocalHost:

```bash
npm run dev
```

In case of being positioned in the central directory of the workspaces use:

```bash
npm run dev:api
```

This in turn runs nodemon, which will help the testing functionality.

### Run en Producción:

Eliminate the "SERVER_MODE" key and change the others to those corresponding to the production environment.
When the keys are in production mode, execute the command:

```bash
npm run start
```
In case of being positioned in the central directory of the workspaces use:

```bash
npm run start:api
```