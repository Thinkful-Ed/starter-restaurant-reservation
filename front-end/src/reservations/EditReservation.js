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

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handleSubmit = async (reservation) => {
    const abortController = new AbortController();
    try {
      const formattedDate = formatAsDate(reservation.reservation_date);
      await editReservation({
        ...reservation,
      });
      history.push(`/dashboard?date=${formattedDate}`);
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <h2 className="p-4 m-4 text-center">Edit a Reservation</h2>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        initialFormState={currentReservation}
        reservationsError={reservationsError}
      />
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default EditReservation;
