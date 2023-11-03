import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const initalForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [newReservation, setNewReservation] = useState(initalForm);
  const [error, setError] = useState(null);

  function changeHandler({ target: { name, value } }) {
    setNewReservation((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const response = {
      ...newReservation,
      status: "booked",
    };

    response.people = Number(response.people);
    createReservation(response)
      .then(() => {
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
      })
      .catch(setError);
  }

  return (
    <main>
      <h1>Create Reservation</h1>
      <ReservationForm
        newReservation={newReservation}
        setNewReservation={setNewReservation}
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
      />
      <ErrorAlert error={error} />
    </main>
  );
}

export default NewReservation;
