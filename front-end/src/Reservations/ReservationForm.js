import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
/* The /reservations/new page will

    have the following required and not-nullable fields:
        First name: <input name="first_name" />
        Last name: <input name="last_name" />
        Mobile number: <input name="mobile_number" />
        Date of reservation: <input name="reservation_date" />
        Time of reservation: <input name="reservation_time" />
        Number of people in the party, which must be at least 1 person. <input name="people" />
    display a Submit button that, when clicked, saves the new reservation, then displays the /dashboard page for the date of the new reservation
    display a Cancel button that, when clicked, returns the user to the previous page
    display any error messages returned from the API
 */

export default function ReservationForm({reservation, setReservation, submitHandler}) {
	const history = useHistory();


	function changeHandler({ target: { name, value } }) {
		setReservation((previousReservation) => ({
			...previousReservation,
			[name]: value,
		}));
	}



	return (
		<div className='card'>
			<div className="card-header text-center ">
        <h2>New Reservation</h2>
				<div className="d-flex justify-content-center card-body">
					<form onSubmit={submitHandler}>
						<div>
							<div className="card text-center">
								<label>First Name</label>
								<input
									name="first_name"
									type="text"
									value={reservation.first_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Last Name</label>
								<input
									name="last_name"
									type="text"
									value={reservation.last_name}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Mobile Number</label>
								<input
									name="mobile_number"
									type="tel"
									value={reservation.mobile_number}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Date of Reservation</label>
								<input
									name="reservation_date"
									type="date"
									value={reservation.reservation_date}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Time of Reservation</label>
								<input
									name="reservation_time"
									type="time"
									value={reservation.reservation_time}
									onChange={changeHandler}
								/>
							</div>
							<div className="card text-center">
								<label>Party Size</label>
								<input
									name="people"
									type="number"
                  min={1}
									value={reservation.people}
									onChange={changeHandler}
								/>
							</div>
						</div>
						<div className="card-footer d-flex justify-content-between">
							<button type="submit">Submit</button>
							<button type="button" onClick={history.goBack}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
