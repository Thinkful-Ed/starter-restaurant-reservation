/** @format */

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

// User Story #8; change an existing reservation
//handle form submission; display error messages; provide navigation functionality
//fetch existing reservation data with useEffect() hook
function ReservationEdit() {
	const history = useHistory();
	//retrieve the reservation Id parameter from the URL using useParams
	const { reservation_id } = useParams();
	//set up state variables
	const [reservation, setReservation] = useState({});
	const [error, setError] = useState(null);
	//load the user data by making an API call
	useEffect(() => {
		setReservation({});
		const abortController = new AbortController();
		async function loadReservation() {
			try {
				const loadedReservation = await readReservation(
					reservation_id,
					abortController.signal,
				);
				setReservation(loadedReservation);
			} catch (error) {
				if (error.name !== "AbortError") {
					setError(error);
				}
			}
		}
		loadReservation();
		return () => abortController.abort();
	}, [reservation_id]);
	//handles changes in form inputs
	const handleChange = ({ target }) => {
		setReservation({
			...reservation,
			[target.name]: target.value,
		});
	};
	const handleCancel = () => {
		history.goBack();
	};
	//handles logic when a form is submitted; prevens default behavior;
	//converts people value to a Number
	const handleSubmit = async (event) => {
		event.preventDefault();
		setError(null);
		const abortController = new AbortController();
		reservation.people = Number(reservation.people);
		try {
			const response = await updateReservation(
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
	};
	if (reservation.reservation_id) {
		return (
			<div>
				<h2>Edit Reservation {reservation.reservation_id}</h2>
				<ErrorAlert error={error} />
				<ReservationForm
					reservation={reservation}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
				/>
			</div>
		);
	}
	return "Loading...";
}

export default ReservationEdit;
