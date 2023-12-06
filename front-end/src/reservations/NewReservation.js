import React, { useState } from "react";
import ReservationForm from "./ReservationForm";

/**
 * Defines the new reservation page.
 * @returns {JSX.Element}
 */

function NewReservation() {
  const [reservationsErrors, setReservationsErrors] = useState(null);
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  return (
    <div>
      <ReservationForm
        initialFormData={initialFormData}
        setReservationsErrors={setReservationsErrors}
        reservationsErrors={reservationsErrors}
      />
    </div>
  );
}

export default NewReservation;
