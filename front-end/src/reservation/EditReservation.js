import React from 'react';
import FormReservation from './FormReservation';
import { useParams } from 'react-router-dom';
import { readReservation } from '../utils/api';
import { useEffect, useState } from 'react';
import { formatAsDate, formatAsTime} from '../utils/date-time';
import { useHistory } from 'react-router-dom';
import { editReservation } from '../utils/api';

export default function EditReservation() {
	const { reservation_id } = useParams();
	const [reservation, setReservation] = useState({});
	const [error, setError] = useState(null);
	const history = useHistory();

  

useEffect(() => {
  async function loadReservation() {
    const abortController = new AbortController();
    try {
      const fetchedReservation = await readReservation(
        reservation_id,
        abortController.signal
      );

      // Set the fetched reservation with the existing reservation_date
      const existingReservationDate = formatAsDate(
        fetchedReservation.reservation_date
      );
      const existingReservationTime = formatAsTime(
        fetchedReservation.reservation_time
      );

      setReservation({
        ...fetchedReservation,
        reservation_date: existingReservationDate,
        reservation_time: existingReservationTime,
      });
    } catch (error) {
      setError(error);
    }
  }
  loadReservation();
}, [reservation_id]);



	async function submitHandler(event) {
		event.preventDefault();
		const abortController = new AbortController();
		try {

      const updatedReservation = {
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        mobile_number: reservation.mobile_number,
        reservation_date: formatAsDate(reservation.reservation_date),
        reservation_time: reservation.reservation_time,
        people: reservation.people,
        
      };
      await editReservation( reservation.reservation_id, updatedReservation, abortController.signal);
      const formattedDate = formatAsDate(updatedReservation.reservation_date);
      history.push(`/dashboard?date=${formattedDate}`);
    }
    catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  }


	return (
		<div>
			<FormReservation
				reservation={reservation}
				setReservation={setReservation}
				submitHandler={submitHandler}
				error={error}
				isEditing={true}
			/>
		</div>
	);
}
