import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isNotOnTuesday, isInTheFuture } from "../utils/date-time";
import { findReservation, modifyReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation({ error, setError }) {
  // Get access to history object to navigate programmatically
  const history = useHistory();

  // Extract the reservation_id from the URL parameters
  const { reservation_id } = useParams();

  // State to store the reservation data
  const [reservationData, setReservationData] = useState(null);

  // Load reservation data when the component mounts or reservation_id changes
  useEffect(() => {
    async function loadReservation() {
      try {
        // Create an AbortController for the API request
        const ac = new AbortController();

        // Fetch reservation data using the API and signal from the AbortController
        const reservation = await findReservation(reservation_id, ac.signal);

        // Set the fetched reservation data into state
        setReservationData(reservation);

        // Return a function to abort the API request if component unmounts
        return () => ac.abort();
      } catch (error) {
        setError(error);
      }
    }

    // Call the loadReservation function
    loadReservation();
  }, [reservation_id, setError]);

  // Validate the reservation and find any errors
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

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const errors = findErrors(reservationData);
    if (errors.length) {
      setError({ message: errors });
      return;
    }
    try {
      const ac = new AbortController();

      // Modify the reservation data to ensure people is a number
      const modifiedData = {
        ...reservationData,
        people: Number(reservationData.people),
      };

      // Update the reservation using the API and signal from the AbortController
      await modifyReservation(reservation_id, modifiedData, ac.signal);

      // Redirect to the dashboard with the updated reservation date
      history.push(`/dashboard?date=${reservationData.reservation_date}`);

      // Abort the API request
      ac.abort();
    } catch (error) {
      setError(error);
    }
  }

  // Handle changes in the reservation form inputs
  function handleFormChange(e) {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  }

  // Wait for reservationData to be fetched before rendering
  if (!reservationData) {
    return null;
  }

  return (
    <>
      {/* Display any errors using ErrorAlert */}
      <ErrorAlert error={error} />

      {/* Render the ReservationForm component with reservation data */}
      <ReservationForm
        formData={reservationData}
        handleChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default EditReservation;
