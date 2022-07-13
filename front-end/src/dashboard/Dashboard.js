import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);

	useEffect(loadDashboard, [date]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		return () => abortController.abort();
	}

	const reservationsList = reservations.map((res, index) => {
		return (
			<tr key={index}>
				<td>{`${res.reservation_date} @ ${res.reservation_time}`}</td>
				<td>{res.people}</td>
				<td>{res.last_name}</td>
				<td>{res.first_name}</td>
				<td>{res.mobile_number}</td>
				<td>
					<button> cancel </button>
				</td>
			</tr>
		);
	});

	return (
		<main>
			<h1>Dashboard</h1>
			<div className="d-md-flex mb-3">
				<h4 className="mb-0">Reservations for date</h4>
			</div>
			<ErrorAlert error={reservationsError} />
			<div className="card">
				{/* <div className="card-body"> */}
				<table class="table table-hover">
					<tr>
						<th scope="col">Reservation Date &amp; Time</th>
						<th scope="col">Party Size</th>
						<th scope="col">Last Name</th>
						<th scope="col">First Name</th>
						<th scope="col">Phone</th>
					</tr>
					{reservationsList}
				</table>
				{/* </div> */}
			</div>
		</main>
	);
}

export default Dashboard;
