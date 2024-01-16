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
    people: "",
  };
  const [reservation, setReservation] = useState({
    ...createNewReservation,
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
    console.log("reservation: ", { ...reservation }, createNewReservation);
    createReservation(reservation)
      .then(setReservation({ ...createNewReservation }))
      .then(history.push(`/dashboard/?date=${reservation.reservation_date}`));
      console.log(reservation);
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
            reservation={reservation}
          />
        </div>
      </div>
    </>
  );
}

export default CreateReservation;
