import React, { useState } from 'react';
import { createReservation } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { formatAsDate } from '../utils/date-time';
import FormReservation from './FormReservation';

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

	function submitHandler(event) {
		event.preventDefault();
		createReservation(reservation)
			.then((createdReservation) => {
				const formattedDate = formatAsDate(createdReservation.reservation_date);
				setReservation(initialFormState);
				history.push(`/dashboard?date=${formattedDate}`);
			})
			.catch(setError);
	}

	return (
		<div>
			<FormReservation
				reservation={reservation}
				setReservation={setReservation}
				submitHandler={submitHandler}
				error={error}
			/>
		</div>
	);
}
