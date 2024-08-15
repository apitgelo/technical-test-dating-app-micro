## Dating App Micro
This project is a technical test that building a RESTful API using TypeScript for dating app microservice.

## Applicant
- **Name:** Hafidz Prasetya
- **Email:** apitgelo@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/hafidz-prasetya
- **GitHub:** https://github.com/apitgelo

## API Docs
You can find the API documentation in the [swagger.yaml](./docs/swagger.yaml) file.

## Requirements
- NodeJS
- Yarn
- MongoDB

## Installation
1. Copy .env
   ```
   cp .env.example .env
   ```
1. Install dependencies
   ```
   yarn install
   ```
1. Run server in development mode
   ```
   yarn run debug
   ```
1. Run unit tests
   ```
   yarn run test
   ```

## Run application using Docker
1. Build and start the services
   ```
   docker-compose up --build
   ```
1. Stop the services
   ```
   docker-compose down
   ```

## Project Structure
### Directory Tree
```
.
├── docs
│   └── swagger.yaml
├── src
│   ├── config
│   ├── controllers
│   ├── database
│   ├── exceptions
│   ├── interfaces
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── validators
│   ├── app.ts
│   └── server.ts
├── tests
│   ├── controllers
│   ├── services
│   └── utils
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
└── tsconfig.test.json
```

### docs
Folder that contains the documentations.
- swagger.yaml: Contains the API documentation in OpenAPI format.

### src
Contains the source code of the application.
- config: Contains the configuration of the application.
- controllers: Contains the controllers of the application.
- database: Contains the database configuration.
- exceptions: Contains the custom exceptions of the application.
- interfaces: Contains the interfaces of the application.
- middlewares: Contains the middlewares of the application.
- models: Contains the models of the application.
- routes: Contains the routes of the application.
- services: Contains the services of the application.
- validators: Contains the validators of the application.
- app.ts: Contains the application initialization.
- server.ts: Contains the server initialization.

### tests
Contains the unit tests of the application.
- controllers: Contains the unit tests for the controllers.
- services: Contains the unit tests for the services.
- utils: Contains the utility functions for the unit tests.
