import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function UpdateReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});
  const [readError, setReadError] = useState(null);
  console.log(reservation_id);

  useEffect(() => {
    function getReservation() {
      const abortController = new AbortController();
      setReadError(null);
      readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setReadError);
      return () => abortController.abort();
    }
    getReservation();
  }, [reservation_id]);

  console.log(reservation);
  return (
    <>
      <h1 className="my-3">Update Existing reservation</h1>
      <ErrorAlert error={readError} />
      <hr></hr>
      <ReservationForm reservation={reservation} />
    </>
  );
}

export default UpdateReservation;
