/** @format */

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

//import utility functions

import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

//import components

import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

const ReservationEdit = () => {
	const history = useHistory();

	const { reservation_id } = useParams();

	const [reservation, setReservation] = useState({});
	const [error, setError] = useState(null);

	//load reservation
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

	const changeHandler = ({ target }) => {
		setReservation({
			...reservation,
			[target.name]: target.value,
		});
	};

	const submitHandler = async (event) => {
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
		return () => abortController.abort();
	};

	const cancelHandler = () => {
		history.goBack();
	};

	if (reservation.reservation_id) {
		return (
			<div>
				<h2>Edit reservation {reservation.reservation_id}</h2>
				<ErrorAlert error={error} />
				<ReservationForm
					reservation={reservation}
					changeHandler={changeHandler}
					submitHandler={submitHandler}
					cancelHandler={cancelHandler}
				/>
			</div>
		);
	}
	return "Loading...";
};

export default ReservationEdit;
