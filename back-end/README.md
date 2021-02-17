# Restaurant Reservation Backend Application

This starter code for the backend of the capstone project in the Thinkful curriculum.

## Existing files

As you work through the Node.js, Express & PostgreSQL module, you will be writing code that allows your controllers to connect to and query your PostgreSQL database via [Knex](http://knexjs.org/). The table below describes the files and folders in the starter code:

| Folder/file path | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| `src/app.js`     | Directs requests to the appropriate routers.                                     |
| `src/server.js`  | Starts the server on `localhost:5000` by default.                                |
| `src/db/`        | A folder where you will add migration and seed files for your database later on. |
| `src/errors/`    | A folder where you will find several functions for handle various errors         |
| `.env.sample`    | A sample environment configuration file                                          |

This starter code closely follows the best practices and patterns established in the Robust Server Structure module.

## Database setup

1. Set up three new ElephantSQL database instance - development, test, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

## Installation

1. Fork and clone this repository.
1. Run `cp .env.sample .env`.
1. Update your `.env` file with a connection URL to your ElephantSQL database instance.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.
