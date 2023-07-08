/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { formatAsDate } from "../utils/date-time";
import { createReservation } from "../utils/api";

// set up a form for creating reservations, handling submission, user story 1
//displaying error messages, and providing navigation functionality
function ReservationCreate() {
	const history = useHistory();
	//define initial state values for the form
	const initialFormState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	};
	//set up initial state variables
	const [reservation, setReservation] = useState({ ...initialFormState });
	const [error, setError] = useState(null);

	//a cancel handler that navigates back to the previous page
	const handleCancel = () => {
		history.goBack();
	};
	//the submit handler handles form submission, prevents default behavior,
	//clears previous error messages, creates an abort controller,
	// converst the number of people to a Number
	//and calls createReservation to create a new reservation
	const handleSubmit = async (event) => {
		event.preventDefault();
		setError(null);
		const abortController = new AbortController();
		reservation.people = Number(reservation.people);

		try {
			const response = await createReservation(
				reservation,
				abortController.signal,
			);
			//success redirects the user to the dashboard for a specific date
			history.push(
				`/dashboard?date=${formatAsDate(response.reservation_date)}`,
			);
		} catch (error) {
			//if an error occurs, set the error state to the error object
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};
	//update the state when the form inputs change
	const handleChange = ({ target: { name, value } }) => {
		setReservation((prevReservation) => ({
			...prevReservation,
			[name]: value,
		}));
	};

	//render JSX; include a heading, an ErrorAlert, and the ReservationForm component
	return (
		<>
			<h2 className="mb-3 pt-3">Create a New Reservation</h2>
			<ErrorAlert error={error} />
			<ReservationForm
				reservation={reservation}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				handleCancel={handleCancel}
			/>
		</>
	);
}
export default ReservationCreate;
