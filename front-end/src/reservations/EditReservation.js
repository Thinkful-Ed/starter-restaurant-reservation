import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import { readReservation } from "../utils/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Defines the new reservation page.
 * @returns {JSX.Element}
 */

function EditReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [reservationsErrors, setReservationsErrors] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(loadReservation, [reservation_id]);

  //get reservation query
  //load reservation
  //set form data
  //load form with form data

  function loadReservation() {
    if (reservation_id !== null) {
      const abortController = new AbortController();

      readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setReservationsErrors);
      return () => abortController.abort();
    }
  }

  useEffect(() => {
    if (reservation !== null) {
      setInitialFormData({
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        mobile_number: reservation.mobile_number,
        reservation_date: reservation.reservation_date.split("T")[0],
        reservation_time: reservation.reservation_time,
        people: reservation.people,
      });
    }
  }, [reservation]);

  return reservation !== null ? (
    <div>
      <ReservationForm
        initialFormData={initialFormData}
        isEditing={true}
        setReservationsErrors={setReservationsErrors}
        reservationsErrors={reservationsErrors}
        reservation_id={reservation_id}
      />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default EditReservation;
