import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { today } from "../utils/date-time";
import ReservationForm from "../ReservationForm/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function CreateReservation() {
	const history = useHistory();
	const initReservation = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: today(),
		reservation_time: "",
		people: 0,
		status: "booked",
	};
	const [reservation, setReservation] = useState(initReservation);
	const [reservationError, setReservationError] = useState(null);

	const createSubmitHandler = async () => {
		try {
			const abortController = new AbortController();
			await createReservation(
				{ data: reservation },
				abortController.signal
			);
			history.push(`/dashboard?date=${reservation.reservation_date}`);
		} catch (error) {
			setReservationError(error);
		}
	};

	console.log(reservation);
	return (
		<div
			style={{
				margin: "10px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>Create Reservation</h1>
			<ErrorAlert error={reservationError} />
			<ReservationForm
				reservation={reservation}
				setReservation={setReservation}
				submitFunction={createSubmitHandler}
			/>
		</div>
	);
}
