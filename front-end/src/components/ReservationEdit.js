import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readReservation, updateReservation } from '../utils/api';
import { Form } from './Form';
import { hasValidDateAndTime } from './RSVPValidate';
import { ReservationError } from './ReservationError';

export const ReservationEdit = () => {
  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 0,
  });
  const { reservation_id } = useParams();
  const [reservationErrors, setReservationErrors] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    setReservationErrors(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationErrors);

    return () => abortController.abort();
  }, [reservation_id]);

  const changeHandler = (event) => {
    if (event.target.name === 'people') {
      setReservation({
        ...reservation,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const errors = hasValidDateAndTime(reservation);
    if (errors.length) {
      return setReservationErrors(errors);
    }

    try {
      await updateReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationErrors([error]);
    }

    return () => abortController.abort();
  };

  return (
    <section>
      <h2 className='header-dashboard'>Edit Reservation:</h2>
      <ReservationError errors={reservationErrors} />
      <Form
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </section>
  );
};
