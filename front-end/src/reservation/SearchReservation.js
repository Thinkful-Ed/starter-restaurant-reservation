import React from 'react';
import { searchByMobile } from '../utils/api';
import { useState } from 'react';
import ReservationsList from '../dashboard/ReservationsList';
import ErrorAlert from '../layout/ErrorAlert';

export default function SearchReservation() {
	const [reservationsError, setReservationsError] = useState(null);
  const [reservations, setReservations] = useState([]);

	async function handleSubmit(event) {
		event.preventDefault();
    const mobile_number = event.target.mobile_number.value;
    const abortController = new AbortController();
    try {
      const reservations = await searchByMobile(mobile_number, abortController.signal);
      setReservations(reservations);
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
	}

	return (
		<div>
			<div>
				<h1>Search Reservation</h1>
				<div>
					<form onSubmit={handleSubmit}>
            <ErrorAlert error={reservationsError} />
						<div className="form-group">
							<label htmlFor="mobile_number">Mobile Number:</label>
							<input
								name="mobile_number"
								id="mobile_number"
								type="tel"
								className="form-control"
								placeholder="Enter a customer's phone number"
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Find
						</button>
					</form>
				</div>
			</div>
			<div>
				<ReservationsList reservations={reservations}/>
			</div>
		</div>
	);
}
