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

-list (listReservationsByQuery): as the name implies, this API endpoint will take a query for mobile number or date and return the reservation which matches either the date (reservations for a day on the dashboard) or mobile number given to the function (you can see this API endpoint in action on the dashboard)

-get (getReservationById): this endpoint gets the reservation details when you give it reservation Id

-post: this endpoint will post a new reservation that is created by the user

-update status (put): this endpoint will update the status of a reservation (booked, cancelled, seated, finished)

-updateReservation: this endpoint will update specific details of a reservation, changing the first name, last name, mobile number, number of guests for the reservation, reservation date and time.

** TABLES **

-post: This endpoint posts a new table to the database

-get: this endpoint will get all tables that are in the database (you can find this endpoint in action on the dashboard)

-put: this endpoint updates the reservation_id that is associated with each table. That is, if there is a reservation seated at a table, the table is associated with this reservation Id so that restaurant staff are able to manage their reservations and know where each reservation is seated. When there is a reservation Id that is associated with a table, the status of the table changes from 'free' to 'occupied' so staff know that additional guests cannot be seated there.

-delete: this endpoint finishes a table. That is, when a reservation leaves and frees up a table, the reservation Id that is associated with that table will be deleted, freeing the table and changing status from 'occupied' to 'free', indicating it is ready to seat more guests.

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
