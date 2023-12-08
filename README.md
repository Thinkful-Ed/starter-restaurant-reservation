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
| GET | /reservations | list all reservations, ordered by time | 
| POST | /reservations | create a new reservation |
| GET | /reservations/:reservation_id | read a reservation by reservation_id|
| PUT | /reservations/:reservation_id | update a reservation by reservation_id|
| PUT | /reservations/:reservation_id/status | update a reservation status by reservation_id|
| GET | /reservations?mobile_number=XXXXXXXXXX | list all reservations with the mobile_number (partial or complete)
| GET | 	/reservations?date=XXXX-XX-XX | list all reservations for one date, sorted by time| 
| GET | /tables | list all tables, ordered by name|
| POST | /tables | create a new table | 
| GET | /tables/:table_id/seat | 
