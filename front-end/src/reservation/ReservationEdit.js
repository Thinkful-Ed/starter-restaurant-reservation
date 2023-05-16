import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationErrors from "./ReservationErrors";
import ReservationForm from "./ReservationForm";
import { hasValidDateAndTime } from "./ReservationValidate";

export const ReservationEdit = () => {
  const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [reservation, setReservation] = useState({
    ...initialReservationState,
  });
  const [reservationErrors, setReservationErrors] = useState(null);
  const { reservation_id } = useParams();
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
    if (event.target.name === "people") {
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
      <h2>Edit Reservation:</h2>
      <ReservationErrors errors={reservationErrors} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </section>
  );
};

export default ReservationEdit;