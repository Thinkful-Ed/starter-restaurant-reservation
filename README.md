# Periodic Tables Restaurant Reservation System

Live application link:
https://restaurant-reservation-alj0.onrender.com

For restaurant managers, Periodic Tables Restaurant Reservation System makes it simple to manage restaurant reservations and available tables.

## Front End

### Dashboard

* Allows users to change the date of the reservation through the `Previous` and `Next` buttons located at the top of the application, above the date.
* The user can see the reservations on the selected date
* There are also three options provided to the user to either seat the party, edit their reservation, or cancel their reservation according to their preferences.

  ![image](https://github.com/ashleynguyen37/starter-restaurant-reservation/assets/125700200/ee51d010-4d0e-4b39-83fd-d4828901484b)

### Search

This page allows users to find a reservation based on the customer's phone number, which is connected to their reservation.
* Selecting the `Find` button will locate all reservations that match the phone number added.
* The user does not need to enter a complete phone number, the search function will find all matching reservations.
* Located reservations will also have the option to seat the party, edit the reservation, or cancel the reservation, if these options are not present, the party has already been seated.

![image](https://github.com/ashleynguyen37/starter-restaurant-reservation/assets/125700200/878e4041-57c8-43bd-95d9-a8946f03f15a)

### Seat Reservation

Upon selecting to seat a party, the user will be taken to the seat reservation tab, where they have the option to seat the reservation to an available table.

If the reservation party size does not fit the selected table, the user will be notified.

### New Reservation

This page allows the user to create a new reservation, each reservation is required to include:
* First and last name
* Phone Number
* Reservation Date
* Reservation Time

![image](https://github.com/ashleynguyen37/starter-restaurant-reservation/assets/125700200/a957b46c-356d-44a2-9bf2-115b59008587)

The application will not allow reservations on Tuesdays or any time between 10:30 AM to 9:30 PM, for the restaurant is closed.
![image](https://github.com/ashleynguyen37/starter-restaurant-reservation/assets/125700200/a4e127d3-69d7-4f9b-8988-1e4023fdaf10)

### New Table

This page allows the user to create a new table which requires the following:
* Table Name
* Table Capacity

  ![image](https://github.com/ashleynguyen37/starter-restaurant-reservation/assets/125700200/09ee5ddd-2c85-405c-8fdc-ec6f820a0001)

## Back End

| Request Type        | Route           | Description  |
| ------------- |:-------------:| -----:|
| GET      | /reservations | Returns all movies reservations in the database |
| GET      | /reservations?date=YYYY-MM-DD      |   Returns all reservations by a specific date |
| POST | /reservations      |    Creates a new reservation that is added to the database |
| GET        | /reservations/:reservation_id           | Returns a specific reservation  |
| PUT |/reservations/:reservation_id| Updates the information for a specific reservation|
| PUT      | /reservations/:reservation_id/status | Updates the status of a specific reservation |
| GET      | /tables      |   Returns a list of all tables |
| POST | /tables      |    Creates a new table that is added to the database |
| PUT        | /tables/:table_id/seat           | Assigns a reservation to a table and updates the seated status  |
| DELETE |/tables/:table_id/seat| Removes a reservation from a table|









