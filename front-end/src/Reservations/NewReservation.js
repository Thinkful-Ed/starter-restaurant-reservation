import React from 'react';
import { createReservation } from '../utils/api';
import ReservationForm from './ReservationForm';
import { useHistory } from 'react-router-dom';


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

	const [reservation, setReservation] = React.useState(initialFormState);
	//const [ reservation, setReservation ] = React.useState({...initialFormState });
	const [error, setError] = React.useState(null);

	function submitHandler(event) {
		event.preventDefault();
		createReservation(reservation)
			.then((createReservation) => {
				const res_date =
					createReservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/);
				history.push(`/dashboard?date=${res_date}`);
			})
			.catch(setError);
	}

	return (
		<div>
			<ReservationForm reservation={reservation} setReservation={setReservation} submitHandler={submitHandler} />
		</div>
	);
}
