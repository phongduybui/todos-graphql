# TODOS

Simple CRUD graphQL application for demo purpose

## Techstack

Frontend:

- React Typescript
- Apollo GraphQL Client
- Antd vs Styled component

Backend:

- Apollo Express Server

Database:

- MySQL
- ORM: Sequelize

## Prerequisites

**Install MySQL (if not)**  
Create database name `todos_graphql` or something else:  
`create database todos_graphql;`  
_This name will be placed in `.env` file in after step_

## Environment Variables

To run this project, you will need to add the following environment variables:

- In your `.env` file at server folder `/packages/server/`, add following variables:

```
NODE_ENV=dev
PORT=5000
SQL_DATABASE=todos_graphql
SQL_USER=YOUR_MYSQL_USER_HERE
SQL_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
SQL_HOST=localhost
JWT_SECRET=something
JWT_EXPIRES=3d
```

**\*Note**: Replace `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD` for your information\*

- In your `.env` file at `client` folder `/packages/client/`, add following variables:

```
REACT_APP_GRAPHQL_SERVER_URI=localhost:5000/graphql
```

## Installation

Install project with `yarn`  
At `root` folder, run following scripts:

```bash
 yarn install
 yarn run db:sync
 yarn run client:gentype
```

## Usage/Run Locally

Run web and register new account for test purpose

```bash
/* Run both web client and server */
yarn dev

/* Run only web */
yarn run client

/* Run only server */
yarn run server


/* Run script generate type definition for graphql */
yarn run client:gentype

/* Create tables in database */
yarn run db:sync

/* Reset all tables data in database */
yarn run db:force
```
