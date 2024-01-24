import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatAsDate } from "../utils/date-time";
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

    reservation.people = Number(reservation.people);

    createReservation(reservation)
      .then((response) => {
        setReservation({ ...reservation });
        return response;
      })
      .then((updatedReservation) => {
        if (updatedReservation && updatedReservation.reservation_date) {
          const formattedDate = formatAsDate(
            updatedReservation.reservation_date
          );
          history.push(`/dashboard/?date=${formattedDate}`);
        } else {
          console.error(
            "Invalid or missing reservation data:",
            updatedReservation
          );
          setError(error);
        }
      })
      .catch((error) => {
        console.error("Error during reservation creation:", error);
        setError(error);
      })
      .finally(() => abortController.abort());
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
