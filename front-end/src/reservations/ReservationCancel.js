/** @format */

import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservation } from "../utils/api.js";

//user story #8: functionality to cancel a reservation
//the function takes a reservation_id prop
function ReservationCancel({ reservation_id }) {
	//error variable is set to null initially
	const [error, setError] = useState(null);
	//async click handler to handle the logic for cancelling a reservation
	const clickHandler = async (event) => {
		event.preventDefault();
		setError(null);
		//the abort controller handles the cancellation of the API request if needed
		const abortController = new AbortController();
		//a confirmation dialog confirms cancellation
		const confirm = window.confirm("Confirm cancellation of this reservation?");
		if (confirm) {
			try {
				await cancelReservation(reservation_id, abortController.signal);
				//reload the page if the cancellation is successful
				window.location.reload();
			} catch (error) {
				//check whether the error is an AbortError
				if (error.name !== "AbortError") {
					setError(error);
				}
			}
		}
		return () => abortController.abort();
	};
	//return jsx code includes ErrorAlert, which displays any error message, and a button with onClick event handler set to clickHandler
	return (
		<div>
			<ErrorAlert />
			<button
				className="btn btn-secondary"
				data-reservation-id-cancel={reservation_id}
				onClick={clickHandler}>
				Cancel
			</button>
		</div>
	);
}

export default ReservationCancel;
