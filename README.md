# Node Boilerplate (PostgreSQL, Typescript, Node.js, Express.js)


## Prerequisites
1. [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. [Homebrew](https://brew.sh/)

## Getting Started (Local Setup)
##### 1. Install Node
- `nvm install node`
##### 2. Install Node Modules

- `brew update`
- `brew install yarn`
- `yarn`

##### 3. Install Postgres
- `brew update`
- `brew install postgresql`
- `brew services start postgresql`
##### 4. Create Local Database
- `createdb my_database_name`
##### 5. Initialize Environment Variables (local)
- `cp .env.example .env.local`
- update `DB_NAME` in `.env.local` to be the name of your database in **#3**
##### 6. Run Database Migrations
- `yarn run setup:local`
##### 7. Start Local Server
- `npm run dev`
```
Database successfully connected.
Server up and running on port 5000.
```



## Resources
- [original boilerplate](https://github.com/leonardorb/backend-postgres-typescript-node-express)
- [TypeORM](https://github.com/typeorm/typeorm)
- [Passport](http://www.passportjs.org/)
- [Passport-JWT](https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436)

------
### OLD README BELOW

# PostgreSQL, TypeScript, Node.js and Express.js Stack

## Overview

This repo is a boilerplate project starter built with TypeScript for a PostgreSQL / Express.js / Node.js backend service. You can plug-in any other frontend library seamlessly.

## Technologies Used

- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
- [Typescript](https://www.typescriptlang.org/) - TypeScript extends JavaScript by adding types to the language
- [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [TypeORM](https://typeorm.io/#/) - TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8)

## Highlights

- [PostgreSQL Audit Trail](https://github.com/leonardorb/backend-postgres-typescript-node-express/blob/master/src/packages/database/helpers/installDatabaseAudit.ts)
- Test Coverage
  ![](https://leo.d.pr/kmVY0g+)
- [Decorators and more](https://github.com/leonardorb/backend-postgres-typescript-node-express/blob/master/src/packages/database/models/user.ts)

## Folders / Files Structure

Here is a high-level overview of our file structure.

```
src/
  __tests__/ # tests
  config/
  packages/
    api/ # API helpers, middlewares, resources, controllers, validations
    database/ # database helpers, models, database migrations
  index.ts
  server.ts
README.md
package.json, etc...
```

## Environment Variables

```
# JWT
AUTH_TOKEN_EXPIRATION_TIME=""
AUTH_TOKEN_SECRET=""

# DATABASE
DB_HOST=""
DB_NAME=""
DB_PASSWORD=""
DB_PORT=""
DB_USERNAME=""
DB_MAIN_SCHEMA=""
DB_AUDIT_SCHEMA=""

# LOGGING
LOGGING_COMBINED_FILE=""
LOGGING_ERROR_FILE=""
LOGGING_LEVEL=""
LOGGING_TYPE=""

# SERVER
SERVER_PORT=""
```

## Setup

1. Create a `.env.local` file on the root of the project based on `.env.example`
2. Create a `dev` app database. `$ createdb <DB_NAME>;`
3. Execute `$ npm run setup:local`
4. Start the development server running `$ npm run dev`

## Running Tests

1. Create a `.env.test` file on the root of the project based on `.env.example`
2. Create a `test` app database. `$ createdb <DB_NAME>;`
3. Execute `$ npm run setup:test`
4. Run `$ npm test`

![](https://leo.d.pr/zRCRhO+)

### License

This project is an open-sourced software licensed under the [MIT license](https://github.com/busayo/meanmap/blob/master/LICENSE).
