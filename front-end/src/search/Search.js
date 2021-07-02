
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationRow from "../dashboard/ReservationRow";

/**
 * A page where a user can search a reservation by mobile number.
 */
export default function Search() {
  const history = useHistory();

	const [mobileNumber, setMobileNumber] = useState("");
	const [reservations, setReservations] = useState([]);
	const [error, setError] = useState(null);

	/**
	 * Whenever a user makes a change to the form, update the state.
	 */
	function handleChange({ target }) {
		setMobileNumber(target.value);
	}

	/**
	 * Whenever a user submits the form, validate and make the API call.
	 */
	function handleSubmit(event) {
		event.preventDefault();

		const abortController = new AbortController();

		setError(null);

		listReservations({ mobile_number: mobileNumber }, abortController.signal)
			.then(setReservations)
      .then( () => history.push(`/search?mobile_number=${mobileNumber}`) )
			.catch(setError);

		return () => abortController.abort();
	}

	const searchResultsJSX = () => {
		return reservations.length > 0 ?
			reservations.map((reservation) => 
				<ReservationRow key={reservation.reservation_id} reservation={reservation} />) :
			<tr><td>No reservations found</td></tr>;
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ErrorAlert error={error} />

				<label className="form-label" htmlFor="mobile_number">Enter a customer's phone number:</label>
				<input 
					className="form-control"
					name="mobile_number"
					id="mobile_number"
					type="tel"
					onChange={handleChange}
					value={mobileNumber}
					required
				/>

				<button className="btn btn-primary m-1" type="submit">Find</button>
			</form>
			
			<table className="table table-hover m-1">
				<thead className="thead-light">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Mobile Number</th>
						<th scope="col">Date</th>
						<th scope="col">Time</th>
						<th scope="col">People</th>
						<th scope="col">Status</th>
						<th scope="col">Edit</th>
						<th scope="col">Cancel</th>
						<th scope="col">Seat</th>
					</tr>
				</thead>
				
				<tbody>
					{searchResultsJSX()}
				</tbody>
			</table>
		</div>
	);
}