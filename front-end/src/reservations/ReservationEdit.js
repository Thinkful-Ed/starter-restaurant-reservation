/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//import utility functions
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

//import components
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

const ReservationCreate = () => {
	const history = useHistory();

	const initialFormState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	};

	const [reservation, setReservation] = useState({ ...initialFormState });
	const [error, setError] = useState(null);

	const cancelHandler = () => {
		history.goBack();
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		setError(null);

		const abortController = new AbortController();
		reservation.people = Number(reservation.people);

		try {
			const response = await createReservation(
				reservation,
				abortController.signal,
			);
			history.push(
				`/dashboard?date=${formatAsDate(response.reservation_date)}`,
			);
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};

	const changeHandler = ({ target: { name, value } }) => {
		setReservation((previousReservation) => ({
			...previousReservation,
			[name]: value,
		}));
	};

	return (
		<>
			<h2 className="mb-3 pt-3">Create Reservation</h2>
			<ErrorAlert error={error} />
			<ReservationForm
				reservation={reservation}
				submitHandler={submitHandler}
				changeHandler={changeHandler}
				cancelHandler={cancelHandler}
			/>
		</>
	);
};

export default ReservationCreate;
