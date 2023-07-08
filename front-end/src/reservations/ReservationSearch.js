/** @format */

import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import searchReservations from "./utils/api";

//user story 7: search for a reservation by partial or complete phone number.
//place holder text is 'Enter a customer's phone number"
//the search will display all records associated with that phone number, regardless of status
function ReservationSearch() {
	const [reservations, setReservations] = useState([]);
	const [input, setInput] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		//prevent default behavior
		event.preventDefault();
		//set the error state to null
		setError(null);
		//initialize and pass in the abort controller to stop API req if needed
		const abortController = new AbortController();
		//asynchronously search for input in reservations
		try {
			const responseData = await searchReservations(
				input,
				abortController.signal,
			);
			setReservations(responseData);
			setInput("");
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};
	//update input state as the user types in the input field
	const handleChange = (event) => {
		setInput(event.target.value);
	};
	//define layout and structure of the list component
	//input field for phone#, Find button, and error alert
	//display search results in a the ReservationList component or display a "not found" message
	return (
		<main>
			<div className="col form-group">
				<div className="row d-md-flex my-3">
					<h2>Find Reservation</h2>

					<ErrorAlert error={error} />
				</div>

				<form onSubmit={handleSubmit}>
					<div className="row input-group mb-3">
						<input
							type="tel"
							className="form-control"
							name="mobile_number"
							placeholder="Enter a customer's phone number"
							aria-label="mobile_number"
							aria-describedby="basic-addon2"
							required={true}
							value={input}
							onChange={handleChange}
						/>
						<button
							className="btn btn-primary"
							id="basic-addon2"
							type="submit">
							Find
						</button>
					</div>
				</form>
			</div>

			<div className="container-fluid col">
				<div className="row d-md-flex mb-3">
					<h4>Search Result</h4>
				</div>
				{reservations.length > 0 ? (
					<div className="row d-md-flex mb-3">
						<ReservationList reservations={reservations} />
					</div>
				) : (
					<div
						className="row d-md-flex mb-3 alert alert-dark text-center"
						role="alert">
						No reservations found
					</div>
				)}
			</div>
		</main>
	);
}

export default ReservationSearch;
