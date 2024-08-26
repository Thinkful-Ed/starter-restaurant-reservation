import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editReservation, readReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const [currentReservation, setCurrentReservation] = useState({});
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal).then(
      setCurrentReservation
    );
    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = async (reservation) => {
    try {
      const formattedDate = formatAsDate(reservation.reservation_date);
      await editReservation({
        ...reservation,
      });
      history.push(`/dashboard?date=${formattedDate}`);
    } catch (error) {
      setReservationsError(error);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column w-75">
      <h1 className="p-4 m-2 text-center fs-1 fw-bold">Edit a Reservation</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        initialFormState={currentReservation}
        reservationsError={reservationsError}
      />
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default EditReservation;
