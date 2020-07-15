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
- `yarn global add typescript`
##### 3. Install Postgres
- `brew update`
- `brew install postgresql`
- `brew services start postgresql`
##### 4. Identify your Postgres user
- `psql`
- `\du`
- take a "superuser" role (often your computer user or just `postgres`) and assign it to `DB_USER` in `.env.local`
##### 5. Create Local Database
- `createdb my_database_name`
##### 6. Initialize Environment Variables (local)
- `cp .env.example .env.local`
- update `DB_NAME` in `.env.local` to be the name of your database in **#5**
##### 7. Run Database Migrations
- `yarn setup:local`
##### 8. Start Local Server
- `yarn dev`
```
Database successfully connected.
Server up and running on port 5000.
```

## Production Deployment
##### 1. Install Docker
- [Docker installation](https://docs.docker.com/get-docker/)
##### 2. Acquire AWS console account and access key/secret if necessary
- [Sign up here](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)
- Login and open the dropdown on your name in the upper right, then click **My Security Credentials**
- Open the **Access keys (access key ID and secret access key)** accordion tab and click **Create New Access Key**
- In the modal that appears, click **Show Access Key** and store the *Access Key ID* and *Secret Access Key* in a secure place for later
##### 3. Install AWS CLI and configure with your account
- [AWS CLIv2 installation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- run `aws configure` in your terminal and input the *Access Key ID* and *Secret Access Key* from the previous step. Leave default region (`us-east-2`) and default output format as is and progress by pressing Enter until done.
##### 4. Create RDS Postgres database
- [WIKI: AWS RDS Postgres DB](https://github.com/dqian/node-boilerplate/wiki/AWS-RDS-Postgres-DB)
##### 5. Create ECR repository
- [WIKI: AWS ECR Repository](https://github.com/dqian/node-boilerplate/wiki/AWS-ECR-Repository)
##### 6. Create ECS cluster and task definition
- [WIKI: AWS ECR Cluster and Task Definition](https://github.com/dqian/node-boilerplate/wiki/AWS-ECS-Cluster-and-Task-Definition)
##### 7. Create EC2 load balancer (ELB)
- [WIKI: AWS EC2 Load Balancer](https://github.com/dqian/node-boilerplate/wiki/AWS-EC2-Load-Balancer)
##### 8. Create ECS service in cluster
- [WIKI: AWS ECS Cluster Service](https://github.com/dqian/node-boilerplate/wiki/AWS-ECS-Cluster-Service)
##### 9. Create .env.production
- `cp .env.example .env.production`
- populate the `DB_` variables with your RDS info
- populate the `AWS_` variables with your ECR repository, ECS cluster, and ECS service info
- feel free to generate a random secure string for `AUTH_TOKEN_SECRET` as well
##### 10. Run migrations on production DB
- `yarn setup:prod` 
##### 11. Deploy to ECR repository
- `yarn deploy`
- press `q` when the cluster schema appears once deployment is done to return to your terminal
##### 12. Monitor ECS service task and verify ELB DNS 
- From your [ECS Cluster dashboard](https://us-east-2.console.aws.amazon.com/ecs/home?region=us-east-2#/clusters), navigate into your service and open the **Tasks** tab. From here, you can wait for your task to reach "RUNNING" status and/or click into the task and view logs.
- Once running, you can type in your load balancer's DNS name into a browser to reach your server. Try checking out the `/health` endpoint.
```
{
  status: "OK",
  version: 0.1,
  c: 0
}
```

## Domain and SSL
- Ideally, we will put our node server behind a subdomain like `api.my-domain.com`.
- [WIKI: Domain and SSL](https://github.com/dqian/node-boilerplate/wiki/Domain-and-SSL)

## Logging
We leverage [Winston](https://github.com/winstonjs/winston#readme) as a logger, which supports a variety of transports. 
- For development, we simply output to the console. 
- For production, LogDNA (which has a basic free tier) is already preconfigured and only requires an ingestion key (`LOGDNA_KEY` in `.env.production`) to enable.

## Resources
- [original boilerplate](https://github.com/leonardorb/backend-postgres-typescript-node-express)
- [TypeORM](https://github.com/typeorm/typeorm)
- [Passport](http://www.passportjs.org/)
- [Passport-JWT](https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436)
- [AWS ECR/ECS Deployment](https://dev.to/mubbashir10/containerize-react-app-with-docker-for-production-572b)
- [Winston](https://github.com/winstonjs/winston#readme)
- [LogDNA](https://docs.logdna.com/docs)

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
