import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateReservation } from "../utils/api";
import { today } from "../utils/date-time";
import { readReservation } from "../utils/api";
import ReservationForm from "../ReservationForm/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation() {
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
	const params = useParams();
	const { reservation_id } = params;

	useEffect(() => {
		async function retrieveReservation() {
			if (reservation_id) {
				try {
					const abortController = new AbortController();
					let response = await readReservation(
						reservation_id,
						abortController.signal
					);
					response.reservation_date =
						response.reservation_date.split("T")[0];
					setReservation(response);
				} catch (error) {
					setReservationError(error);
				}
			}
		}
		retrieveReservation();
	}, [reservation_id]);

	const editSubmitHandler = async () => {
		try {
			const abortController = new AbortController();
			await updateReservation(
				{ data: reservation },
				reservation_id,
				abortController.signal
			);
			history.push(`/dashboard?date=${reservation.reservation_date}`);
		} catch (error) {
			setReservationError(error);
		}
	};

	return (
		<div
			style={{
				margin: "10px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>Edit Reservation</h1>
			<ErrorAlert error={reservationError} />
			<ReservationForm
				reservation={reservation}
				setReservation={setReservation}
				submitFunction={editSubmitHandler}
			/>
		</div>
	);
}
