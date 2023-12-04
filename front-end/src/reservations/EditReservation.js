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
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    if (reservation_id !== null) {
      readReservation(reservation_id).then(setReservation);
    }
  }

  useEffect(() => {
    console.log(reservation);
    if (reservation) {
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

  console.log("reservation_id", reservation_id);
  console.log(initialFormData);

  return initialFormData ? (
    <div>
      <ReservationForm initialFormData={initialFormData} isEditing={true} />
    </div>
  ) : (
    <div>loading</div>
  );
}

export default EditReservation;
