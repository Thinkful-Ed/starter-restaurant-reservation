/** @format */

import React, { useState } from "react";

//import components
import ErrorAlert from "../layout/ErrorAlert";

//import utility functions
import { cancelReservation } from "../utils/api.js";

const ReservationCancel = ({ reservation_id }) => {
	const [error, setError] = useState(null);

	const clickHandler = async (event) => {
		event.preventDefault();
		setError(null);

		const abortController = new AbortController();

		const confirmation = window.confirm(
			"Do you want to cancel this reservation? This cannot be undone.",
		);
		if (confirmation) {
			try {
				await cancelReservation(reservation_id, abortController.signal);
				window.location.reload();
			} catch (error) {
				if (error.name !== "AbortError") {
					setError(error);
				}
			}
		}
		return () => abortController.abort();
	};

	return (
		<div>
			<ErrorAlert error={error} />
			<button
				className="btn btn-secondary"
				data-reservation-id-cancel={reservation_id}
				onClick={clickHandler}>
				Cancel
			</button>
		</div>
	);
};

export default ReservationCancel;
