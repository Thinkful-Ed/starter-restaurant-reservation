import React, { useState } from "react";

import { listReservations } from "../utils/api";

import ReservationRow from "../dashboard/ReservationRow";
import ErrorAlert from "../layout/ErrorAlert";


export default function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const abortController = new AbortController();

    setError(null);

    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  const searchResultsJSX = () => {
    // i use a ternary here. we would like to return something different if there are no reservations.
    return reservations.length > 0 ? (
      // you will see that i used the same ReservationRow component that we used in the Dashboard. yay less work!
      reservations.map((reservation) => (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    ) : (
      <p>No reservations found</p>
    );
  };

  return (
    <div>
		<form>
			<ErrorAlert error={error} />

			<label htmlFor="mobile_number">Enter a customer's phone number:</label>
			<input 
				name="mobile_number"
				id="mobile_number"
				type="tel"
				onChange={handleChange}
				value={mobileNumber}
				required
			/>

			<button type="submit" onClick={handleSubmit}>Find</button>
		</form>
			
		<table class="table">
			<thead class="thead-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Mobile Number</th>
					<th scope="col">Time</th>
					<th scope="col">People</th>
					<th scope="col">Status</th>
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
