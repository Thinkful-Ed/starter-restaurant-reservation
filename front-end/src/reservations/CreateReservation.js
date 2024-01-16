import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "../reservations/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
  });

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
    console.log(reservation);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    console.log("reservation: ", { ...reservation });
    reservation.people = Number(reservation.people);
    createReservation(reservation, abortController.signal)
      .then((data) => {
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setError);
    console.log(reservation);
    return () => abortController.abort();
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Add New Reservation</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ErrorAlert error={error} />
          <ReservationForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            reservation={reservation}
          />
        </div>
      </div>
    </>
  );
}

export default CreateReservation;
