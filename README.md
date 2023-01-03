# Restaurant Reservation System

---

![Restuarant-app](insert image file here)
Live site: https://capstone-project-frontend.onrender.com/dashboard

## Brief Explanation of the API

For the API, the user can create new reservations and tables. The data can be updated and reservations and tables can also be deleted. The tables data and reservations data for each day can also be retrieved from the database by date. The API also checks to see if the information that is entered is valid

### Organization

The organization of this backend consists of service, controller, and router for tables and reservations. That is, there are mainly two routes: for tables and for reservations. Reservations includes making new reservations for restaurant guests, cancelling reservations, updating their information, and retrieving a list of reservations by date. The Tables API allows the user to create new tables , modify their information (i.e. name and capacity), and delete reservationIds from the table to free them up. The next section will go into greater detail about the API endpoints.

## API Endpoints

** RESERVATIONS **
-GET /dashboard: retrieve all reservations (and their info) by the date

-POST /reservations/new: create a new reservation

-GET /reservations/:reservation_id/seat : display a selection the tables

-PUT /reservations/:reservation_id/status: this will update the status of the reservation. accepts data in the format: {data: { status: "<new-status>" } } where <new-status> is one of booked, seated, or finished

-GET /reservations?mobile_number=800-555-1212: will retrieve a reservation where the mobile number matches the parameters given

- PUT /reservations/:reservation_id/edit: this will send a put request to the database so that the user can update details of the reservation

** TABLES **

-GET /dashboard: retrieves all the tables and their statuses

-POST /tables/new: create a new table (inputs are table name and capacity of the table)

-PUT /tables/:table_id/seat/: will update reservation Id for the table so that the table will be occupied

-DELETE /tables/:table_id/seat: delete the reservation Id that is associated with a particular table, freeing up this table for new guests

** NOTE **
-all APIS have features that check for required, non nullable fields and correct data type

---

## Summary

For the project, the user is able to create new reservations and tables as well as retrieve this information from the database. The application handles some errors and allows the user to be able to manage and see reservations at the restaurant in an efficient and error-resistant manner. This helps to ensure the organization of reservations and tables at a busy restaurant. The user is assumed to be restaurant staff who enter this information rather than customers themselves.

## Technologies & Tools

- [ ] React
  - [ ] React hooks
  - [ ] React router
- [ ] Node
- [ ] Postgres
- [ ] Express
- [ ] CSS
- [ ] Bootstrap4
- [ ] HTML
- [ ] JavaScript
- [ ] RESTful APIs

## Run Locally

- [ ] Fork & Clone the repostory
- [ ] Run `npm install`
- [ ] Run `npm run start:dev` to start
