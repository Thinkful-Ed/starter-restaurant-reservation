# [Restaurant Reservation System](https://restaurantreservationsystem-frontend.onrender.com)

### Dashboard Page
* View all reservations for a given date
  * Toggle between dates using previous, today, and next buttons
* View all tables and their current status 
### Search Page
* Search for reservations using a partial or complete phone number
* 
### New Reservation Page
* Add a new reservation
### New Table Page
* Add a new table 

# API
Request | Path | Description
| ----------- | ----------- | ----------- | 
| POST | /reservations | Create a new reservation |
| GET | /reservations/:reservation_id | Read a reservation by a reservation_id |
| PUT | /reservations/:reservation_id | Update a reservation by a reservation_id |
| PUT | /reservations/:reservation_id/status | Update a reservation status by a reserervation_id |
| GET | /reservations?mobile_number=XXXXXXXXXX | List all reservation that contain the partial or complete phone number entered, ordered by date |
| GET | 	/reservations?date=XXXX-XX-XX | List all reservations for a given date ordered by date | 
| GET | /tables | List all tables|
| POST | /tables | Create a new table | 
| PUT | /tables/:table_id/seat | Update the table with a reservation |
| DELETE | /tables/:table_id/seat | Delete a reservation from a table | 
