import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation() {
  const URL = process.env.REACT_APP_API_BASE_URL;
  const { reservation_id } = useParams();
  const [existingReservation, setExistingReservation] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function getReservation() {
      const abortController = new AbortController();
      try {
        await axios
          .get(`${URL}/reservations/${reservation_id}`, {
            signal: abortController.signal,
          })
          .then(({ data: { data } }) => {
            setExistingReservation(data);
          });
      } catch (error) {
        setErrors(error);
      }
      return () => {
        abortController.abort();
      };
    }
    getReservation();
  }, [URL, reservation_id]);

  return (
    <div>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={errors} />
      {existingReservation && (
      <ReservationForm
        existingReservation={existingReservation}
        editMode={true}
      />
      )}
    </div>
  );
}
