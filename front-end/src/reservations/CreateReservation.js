import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "../reservations/ReservationForm";

function CreateReservation() {
  const history = useHistory();
  const createNewReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: null,
  };
  const [newReservation, setNewReservation] = useState({
    ...createNewReservation,
  });

  const handleChange = ({ target }) => {
    setNewReservation({
      ...newReservation,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createReservation(newReservation, abortController.signal)
      .then(setNewReservation({ ...createNewReservation }))
      .then(history.push(`/dashboard`));
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
          <ReservationForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            newReservation={newReservation}
            setNewReservation={setNewReservation}
          />
        </div>
      </div>
    </>
  );
}

export default CreateReservation;
