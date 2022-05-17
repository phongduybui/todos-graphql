
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

Install MySQL (if not)
Create database name `todos_graphql` or something else, this name will be placed in `.env` file in after step  
`create database todos_graphql;`


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
***Note**: Replace `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD` for your information*

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
```

## Usage/Run Locally

```bash
<! -- Run both web client and server -- !>
yarn dev

<! -- Run only web -- !>
yarn run client

<! -- Run only server -- !>
yarn run server

<! -- Create tables in database -- !>
yarn run db:sync

<! -- Remove all tables data in database -- !>
yarn run db:force
```

