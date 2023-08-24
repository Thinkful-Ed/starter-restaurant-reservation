import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isNotOnTuesday, isInTheFuture } from "../utils/date-time";
import { findReservation, modifyReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation({ error, setError }) {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    async function loadReservation() {
      try {
        const ac = new AbortController();
        const reservation = await findReservation(reservation_id, ac.signal);
        setReservationData(reservation);
        return () => ac.abort();
      } catch (error) {
        setError(error);
      }
    }

    loadReservation();
  }, [reservation_id, setError]);

  function findErrors(res) {
    const errors = [];
    isNotOnTuesday(res.reservation_date, errors);
    isInTheFuture(res.reservation_date, errors);
    if (res.status && res.status !== "booked") {
      errors.push(
        <li key="not booked">Reservation can no longer be changed</li>
      );
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = findErrors(reservationData);
    if (errors.length) {
      setError({ message: errors });
      return;
    }
    try {
      const ac = new AbortController();
      const modifiedData = {
        ...reservationData,
        people: Number(reservationData.people),
      };
      await modifyReservation(reservation_id, modifiedData, ac.signal);
      history.push(`/dashboard?date=${reservationData.reservation_date}`);
      ac.abort();
    } catch (error) {
      setError(error);
    }
  }

  function handleFormChange(e) {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  }

  if (!reservationData) {
    // Wait for reservationData to be fetched before rendering
    return null;
  }

  return (
    <>
      <ErrorAlert error={error} />
      <ReservationForm
        formData={reservationData} // Use formData instead of initialformData
        handleChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default EditReservation;
