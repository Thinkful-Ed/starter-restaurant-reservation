import React, { useState } from 'react';
import { createReservation } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { formatAsDate } from '../utils/date-time';
import FormReservation from './FormReservation';
import ErrorAlert from '../layout/ErrorAlert';

export default function NewReservation() {
	const history = useHistory();
	const initialFormState = {
		first_name: '',
		last_name: '',
		mobile_number: '',
		reservation_date: '',
		reservation_time: '',
		people: 1,
	};

	const [reservation, setReservation] = useState(initialFormState);
	const [error, setError] = useState(null);

	// function submitHandler(event) {
	// 	event.preventDefault();
	// 	createReservation(reservation)
	// 		.then((createdReservation) => {
	// 			const formattedDate = formatAsDate(createdReservation.reservation_date);
	// 			history.push(`/dashboard?date=${formattedDate}`);
	// 		})
	// 		.catch(setError);
	// }

	async function submitHandler(event) {
		event.preventDefault();
		const abortController = new AbortController();
		try {
			await createReservation(reservation, abortController.signal);
			const formattedDate = formatAsDate(reservation.reservation_date);
			history.push(`/dashboard?date=${formattedDate}`);
		} catch (error) {
			setError(error);
		}
		return () => abortController.abort();
	}
			

	return (
		<div>
			<ErrorAlert error={error} />
			<FormReservation
				reservation={reservation}
				setReservation={setReservation}
				submitHandler={submitHandler}
				error={error}
			/>
		</div>
	);
}
