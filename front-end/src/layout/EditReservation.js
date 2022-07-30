import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { editReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import FormComponent from "./FormComponent";
import { readReservation } from "../utils/api";

export default function EditReservation() {
  const { reservation_id } = useParams();

  const initialData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState(initialData);
  const [reservationError, setReservationError] = useState({});

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const checkReservation = async () => {
      try {
        await readReservation(reservation_id, abortController.signal).then(
          setReservation
        );
      } catch (error) {
        setReservationError(error);
      }
    };
    checkReservation();
    return () => abortController.abort;
  }, [reservationError, reservation_id]);

  async function submitHandler(event) {
    event.preventDefault();
    reservation.people = parseInt(reservation.people);
    const abortController = new AbortController();

    try {
      setReservationError({});
      await editReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
  }

  function changeHandler({ target }) {
    setReservation({ ...reservation, [target.name]: target.value });
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Reservation
          </li>
        </ol>
      </nav>

      <div className="row container">
        <h1>Edit Reservation</h1>
      </div>
      <FormComponent
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        reservation={reservation}
      />
      {reservationError.message && <ErrorAlert error={reservationError} />}
    </>
  );
}