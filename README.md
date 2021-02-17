# Capstone: Restaurant Reservation System

> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating reservation systems for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.

There are no user stories for deployment: it is expected that you will deploy the application to production after you finish a user story.

## Existing files

This repository is set up as a monorepo, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor.

As you work through the user stories listed later in this document, you will be writing code that allows your frontend and backend code to talk to each other. You will also write code to allow your controllers and services to connect to, and query, your PostgreSQL database via [Knex](http://knexjs.org/).

The table below describes the folders in this starter repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `back-end`       | The backend project, which runs on `localhost:5000` by default.  |
| `front-end`      | The frontend project, which runs on `localhost:3000` by default. |

This starter code closely follows the best practices and patterns established in the Robust Server Structure module.

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

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you know you have the necessary functionality.

1. Run `npm test` to run all tests - unit, integration, and end-to-end.
1. Run `npm run test:back-end` to run unit, integration, and end-to-end tests for the backend. The logging level for the backend is set to `warn` when running tests and `info` otherwise.
1. Run `npm run test:front-end` to run unit, integration, and end-to-end tests for the frontend.
1. Run `npm run test:e2e` to run only the end-to-end tests for the frontend.

> **Note**: After running `npm test` or `npm run test:e2e` you might see something like the following in the output: `[start:frontend] Assertion failed:`. This is not a failure, it is just the frontend project getting shutdown automatically.

> **Hint**: If you stop the tests before they finish, it can leave the test database in an unusual state causing the tests to fail unexpectedly the next time you run them. If this happens, delete all the tables in the test database, including the knex\_\* tables, and try the tests again.

### End-to-end tests

HEADLESS
SLO_MO

#### Screenshots

To help you better understand what might be happening during the end-to-end tests, screenshots are taken at various points in the test.

The screenshots are saved in `front-end/.screenshots` and you can review them after running the end-to-end tests.

You can use the screenshots to debug your code by rendering additional information on the screen.

## Product Backlog

The Product Manager has already created the user stories for _Periodic Tables_. Each of the user stories is listed below, and your Product Manager wants them to be implemented in the order in which they are listed. Another developer has already written the tests for each of the user stories so that you don't have to.

Although the user stories do not say anything about deployment, you should consider deploying early and often. You may even decide to deploy before adding any features. Since this is a monorepo, you can follow the instructions in [this vercel article on monorepos](https://vercel.com/blog/monorepos) to deploy this project.

### US-01 Create and list reservations

As a restaurant manager<br/>
I want to create a new reservation when a customer calls<br/>
so that I know how many customers will arrive at the restaurant on a given day.

#### Acceptance Criteria

1. The `/reservations/new` page will
   - have the following required and not-nullable fields:
     - First name: `<input name="first_name" />`
     - Last name: `<input name="last_name" />`
     - Mobile number: `<input name="mobile_number" />`
     - Date of reservation: `<input name="reservation_date" />`
     - Time of reservation: `<input name="reservation_time" />`
     - Number of people in the party, which must be at least 1 person. `<input name="people" />`
   - display a `Submit` button that, when clicked, saves the new reservation, then displays the `/dashboard` page for the date of the new reservation
   - display a `Cancel` button that, when clicked, returns the user to the previous page
   - display any error messages returned from the API
1. The `/dashboard` page will
   - list all reservations for one date only. (E.g. if the URL is `/dashboard?date=2020-12-30` then send a GET to `/reservations?date=2020-12-30` to list the reservations for that date). The date is defaulted to today, and the reservations are sorted by time.
   - display next, previous, and today buttons that allow the user to see reservations on other dates
   - display any error messages returned from the API
1. The `/reservations` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

> **Hint** Dates and times in JavaScript and databases can be challenging.
> The users have confirmed that they will be using Chrome to access the site.
>
> This means you can use `<input type="date" />` and `<input type="time" />`, which are supported by Chrome but may not work in other browsers.
>
> `<input type="date" />` will store the date in `YYYY-MM-DD` format. This is a format that works well with the PostgreSQL `date` data type.
>
> `<input type="time" />` will store the time in `HH:MM:SS` format. This is a format that works well with the PostgreSQL `time` data type.
>
> You do not need to worry about different or changing time zones for dates or times.

### US-02 Create reservation on a future, working date

As a restaurant manager<br/>
I only want to allow reservations to be created on a day when we are open<br/>
so that users do not accidentally create a reservation for days when we are closed.<br/>

#### Acceptance criteria

1. The `/reservations/new` page will display an error message with `className="alert alert-danger"` if any of the following constraints are violated:
   - The reservation date is a Tuesday as the restaurant is closed on Tuesday.
   - The reservation date is in the past. Only future reservations are allowed.
1. The `/reservations` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

> **Hint** There may be more than one validation error on the page at time.
>
> For example, a reservation in the past on a Tuesday violates both rules, so the page should display two errors within a single `className="alert alert-danger"`
>
> However, the API validation does not need to include multiple validation error messages.
> You can run the validation in any order and report only one validation error at a time, and the tests will pass.
>
> Also, parsing a date in YYYY-MM-DD format using the built-in Date class assumes the date is a UTC date. UTC is a time standard that is the basis for civil time and time zones worldwide, but it is NOT a timezone. As a result, keep an eye out for how your dates are interpreted by the Date class.
>
> While there is nothing preventing you from using a third party library to handle dates for your project, you are encouraged to use the built-in Date class.

### US-03 Create reservation within eligible timeframe

As a restaurant manager<br/>
I only want to allow reservations to be created during business hours, up to 60 minutes before closing<br/>
so that users do not accidentally create a reservation for a time we cannot accommodate.

#### Acceptance criteria

1. The `/reservations/new` page will display an error message with `className="alert alert-danger"`, if any of the following additional constraints are violated:
   - The reservation time is before 10:30 AM.
   - The reservation time is after 9:30 PM, because the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.
   - The reservation date and time combination is in the past. Only future reservations are allowed. E.g., if it is noon, only allow reservations starting _after_ noon today.
1. The `/reservations` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

> **Hint** Parsing a Date that includes the time in JavaScript can be tricky. Again, keep an eye out for which time zone is being used for your Dates.

### US-04 Seat reservation

As a restaurant manager, >br/>
When a customer with an existing reservation arrives at the restaurant<br/>
I want to seat (assign) their reservation to a specific table<br/>
so that I know which tables are occupied and free.

#### Acceptance Criteria

1. The `/tables/new` page will
   - have the following required and not-nullable fields:
     - Table name: `<input name="table_name" />`, which must be at least 2 characters long.
     - Capacity: `<input name="capacity" />`, this is the number of people that can be seated at the table, which must be at least 1 person.
   - display a `Submit` button that, when clicked, saves the new table then displays the `/dashboard` page
   - display a `Cancel` button that, when clicked, returns the user to the previous page
1. The `/dashboard` page will:

   - display a list of all reservations in one area.
   - each reservation in the list will:
     - Display a "Seat" button on each reservation.
     - The "Seat" button must be a link with an `href` attribute that equals `/reservations/${reservation_id}/seat`, so it can be found by the tests.
   - display a list of all tables, sorted by `table_name`, in another area of the dashboard
     - Each table will display "Free" or "Occupied" depending on whether a reservation is seated at the table.
     - The "Free" or "Occupied" text must have a `data-table-id-status=${table.table_id}` attribute, so it can be found by the tests.
   - The areas for displaying reservations and tables can be arranged any way you like; left and right or top and bottom, etc.

1. The `/reservations/:reservation_id/seat` page will
   - have the following required and not-nullable fields:
     - Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
   - do not seat a reservation with more people than the capacity of the table
   - display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
   - PUT to `/tables/:table_id/seat/` in order to save the table assignment. The body of the request must be `{ data: { reservation_id: x } }` where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.
   - display a `Cancel` button that, when clicked, returns the user to the previous page
1. The `tables` table must be seeded with the following data:
   - `Bar #1` & `Bar #2`, each with a capacity of 1.
   - `#1` & `#2`, each with a capacity of 6.
1. The `/tables` API will have the same validations as above and will return 400, along with an informative error message, when a validation error happens.

- if the table capacity is less than the number of people in the reservation, return 400 with an error message.
- if the table is occupied, return 400 with an error message.

> **Hint** Work through the acceptance criteria in the order listed, step-by-step. A different order may be more challenging.

### US-05 Finish an occupied table

As a restaurant manager<br/>
I want to free up an occupied table when the guests leave<br/>
so that I can seat more guests at that table.<br/>

#### Acceptance Criteria

1. The `/dashboard` page will
   - Display a "Finish" button on each _occupied_ table.
   - the "Finish" button must have a `data-table-id-finish={table.table_id}` attribute, so it can be found by the tests.
   - Clicking the "Finish" button will display the following confirmation: "Is this table ready to seat new guests? This cannot be undone." If the user selects "Ok" the system will: - Send a `DELETE` request to `/tables/:table_id/seat` in order to remove the table assignment. The tests do not check the body returned by this request. - The server should return 400 if the table is not occupied. - Refresh the list of tables to show that the table is now available.
   - If the user selects "Cancel" no changes are made.

> **Hint** The end-to-end test waits for the tables list to be refreshed before checking the free/occupied status of the table, so be sure to send a GET request to `/tables` to refresh the tables list.

### US-06 Reservation Status

As a restaurant manager<br/>
I want a reservation to have a status of either booked, seated, or finished<br/>
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

#### Acceptance Criteria

1. The `/dashboard` page will
   - display the status of the reservation. The default status is "booked"
     - the status text must have a `data-reservation-id-status={reservation.reservation_id}` attribute, so it can be found by the tests.
   - if reservation status is "booked", display the Seat button.
   - clicking the Seat button changes the status to "seated" and hides the Seat button.
   - clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.
   - to set the status, PUT to `/reservations/:reservation_id/status` with a body of `{data: { status: "<new-status>" } }` where `<new-status>` is one of booked, seated, or finished

> **Hint** Use `Knex.transaction()` to make sure the `tables` and `reservations` records are always in sync with each other.

### US-07 Search for a reservation by phone number

As a restaurant manager<br/>
I want to search for a reservation by phone number (partial or complete)<br/>
so that I can quickly access a customer's reservation when they call about their reservation.<br/>

#### Acceptance Criteria

1. The `/search` page will
   - Display a search box `<input name="mobile_number" />` that displays the placeholder text: "Enter a customer's phone number"
   - Display a "Find" button next to the search box.
   - Clicking on the "Find" button will submit a request to the server (e.g. GET `/reservations?mobile_phone=555-1212`).
     - then the system will look for the reservation(s) in the database and display all matched records on the `/search` page using the same reservations list component as the `/dashboard` page.
     - the search page will display all reservations matching the phone number, regardless of status.
   - If there are no records found after clicking Find, then display a message `No reservations found`.

> **Hint** To search for a partial or complete phone number, you should ignore all formatting and search only for the digits.
> You will need to remove any non-numeric characters from the submitted mobile number and also use the PostgreSQL translate function.
>
> The following function will perform the correct search.
>
> ```javascript
> function search(mobile_number) {
>   return knex("reservations")
>     .whereRaw(
>       "translate(mobile_number, '() -', '') like ?",
>       `%${mobile_number.replace(/\D/g, "")}%`
>     )
>     .orderBy("reservation_date");
> }
> ```

### US-08 Change an existing reservation

As a restaurant manager<br/>
I want to be able to modify a reservation if a customer calls to change or cancel their reservation<br/>
so that reservations are accurate and current.

#### Acceptance Criteria

1. The `/dashboard` and the `/search` page will
   - Display an "Edit" button next to each reservation
     - Clicking the "Edit" button will navigate the user to the `/reservations/:reservation_id/edit` page
   - the "Edit" button must be a link with an `href` attribute that equals `/reservations/${reservation_id}/edit`, so it can be found by the tests.
   - Display a "Cancel" button next to each reservation
   - The Cancel button must have a `data-reservation-id-cancel={reservation.reservation_id}` attribute, so it can be found by the tests.
   - Clicking the "Cancel" button will display the following confirmation: "Do you want to cancel this reservation? This cannot be undone."
     - If the user selects "Ok", the reservation is removed from the page and deleted from the database, the confirmation disappears, and the results on the page are refreshed.
       - this will set the status of the reservation to `cancelled` with a PUT to `/reservations/:reservation_id/status` with a body of `{data: { status: "cancelled" } }`.
     - If the user selects "Cancel" no changes are made.
1. The `/reservations/:reservation_id/edit` page will display the reservation form with the existing reservation data filled in
   - If the user selects "Submit", the reservation is updated, then the user is taken back to the previous page.
   - Only reservations with a status of "booked" can be edited.
   - If the user selects "Cancel" no changes are made.

> **Hint** The same validation used for create applies to editing a reservation. The form and the API for updating a reservation must not allow the user to violate any of the rules specified when creating a reservation.
