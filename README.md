# Capstone: Restaurant Reservation System

> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.

There are no user stories for deployment: it is expected that you will deploy the application to production after you finish a user story.

There are no user stories for logging: it is expected that you will add logging to the application with enough detail to help you diagnose issues in production.

## Existing files

This repository is set up as a _monorepo_, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor.

As you work through the user stories listed later in this document, you will be writing code that allows your frontend and backend applications to talk to each other. You will also write code to allow your controllers and services to connect to, and query, your PostgreSQL database via [Knex](http://knexjs.org/).

The table below describes the folders in this starter repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5000` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |

This starter code closely follows the best practices and patterns established in the Robust Server Structure module.

**Note**: Please do not submit a pull request to this repository with your solution.

### Backend Existing files

The `./back-end` folder contains all the code for the backend project.

The table below describes the existing files in the `./back-end` folder:

| Folder/file path                                         | Description                                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `./back-end/knexfile.js`                                 | The Knex configuration file. You will not need to make changes to this file.                                        |
| `./back-end/src/app.js`                                  | Defines the Express application and connects routers.                                                               |
| `./back-end/src/db/connection.js`                        | The Knex connection file. You will not need to make changes to this file.                                           |
| `./back-end/src/db/migrations`                           | The Knex migrations folder.                                                                                         |
| `./back-end/src/db/seeds/`                               | The Knex seeds folder.                                                                                              |
| `./back-end/src/errors/errorHandler.js`                  | Defined an Express API error handler.                                                                               |
| `./back-end/src/errors/notFound.js`                      | Defined an Express API "not found" handler.                                                                         |
| `./back-end/src/reservations/reservations.controller.js` | A controller for the reservations resource.                                                                         |
| `./back-end/src/reservations/reservations.router.js`     | A router for the reservations resource.                                                                             |
| `./back-end/src/server.js`                               | Defines the node server.                                                                                            |
| `./back-end/test`                                        | A folder that contains all of the integration tests. You will not need to make changes to the files in this folder. |
| `./back-end/vercel.json`                                 | A vercel deployment configuration file. You will not need to make changes to this file.                             |

### Frontend Existing files

The `./front-end` folder contains all the code for the frontend project.

The table below describes the existing files in the `./front-end` folder:

| Folder/file path                                   | Description                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `./front-end/e2e`                                  | Contains all of the end-to-end tests. You will not need to make changes to the files in this folder.   |
| `./front-end/jest-puppeteer.config.js`             | A configuration file used by the end-to-end tests. You will not need to make changes to this file.     |
| `./front-end/src/App.js`                           | Defines the root application component. You will not need to make changes to this file.                |
| `./front-end/src/App.test.js`                      | Contains the tests for the root application component. You will not need to make changes to this file. |
| `./front-end/src/dashboard/Dashboard.js`           | Defines the Dashboard page.                                                                            |
| `./front-end/src/index.js`                         | The main entry point for the React application.                                                        |
| `./front-end/src/layout/ErrorAlert.js`             | Defines an error alert component that display only when an error is specified.                         |
| `./front-end/src/layout/Layout.css`                | The css for the Layout component.                                                                      |
| `./front-end/src/layout/Layout.js`                 | Defines the main layout of the application.                                                            |
| `./front-end/src/layout/Menu.js`                   | Defines the menu for the application.                                                                  |
| `./front-end/src/layout/NotFound.js`               | Defines the "Not found" component that is displayed when no route matches.                             |
| `./front-end/src/layout/Routes.js`                 | Defines all the routes for the application.                                                            |
| `./front-end/src/utils/api.js`                     | Defines the functions used to access the backend API                                                   |
| `./front-end/src/utils/date-time.js`               | Defines functions to format date and time strings.                                                     |
| `./front-end/src/utils/format-reservation-date.js` | Defines a function to format the date on a single reservation or an array of reservations.             |
| `./front-end/src/utils/format-reservation-time.js` | Defines a function to format the time on a single reservation or an array of reservations.             |
| `./front-end/src/utils/useQuery.js`                | Defines a custom hook to parse the query parameters from the URL.                                      |

## Database setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
