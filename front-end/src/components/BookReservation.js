import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReservation } from '../utils/api';
import { Form } from './Form';
import { hasValidDateAndTime } from './RSVPValidate';
import { ReservationError } from './ReservationError';

export const BookReservation = () => {
  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 0,
  });

  const history = useHistory();
  const [reservationErrors, setReservationErrors] = useState(null);

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
      await createReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationErrors([error]);
    }

    return () => abortController.abort();
  };

  return (
    <div>
      <h2 className='header-dashboard'>Create a Reservation:</h2>
      <ReservationError errors={reservationErrors} />
      <Form
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};
