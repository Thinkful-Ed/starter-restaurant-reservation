import React from "react";
import ReservationForm from "./ReservationForm";

/**
 * Defines the new reservation page.
 * @returns {JSX.Element}
 */

function NewReservation() {
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
      <ReservationForm initialFormData={initialFormData} />
    </div>
  );
}

export default NewReservation;
