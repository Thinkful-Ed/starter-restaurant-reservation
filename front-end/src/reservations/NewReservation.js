import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import addDashes from "../utils/addDashes";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./NewReservationForm";
import { createReservation } from "../utils/api";

export default function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const [formErrors, setFormErrors] = useState([]);

  const handleChange = ({ target }) => {
    if (target.name === "mobile_number") {
      addDashes(target);
    }
    setFormData({
      ...formData,
      [target.name]:
        target.name === "people" ? parseInt(target.value) : target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const abortController = new AbortController();

    setFormErrors([]);

    const reservationDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00`
    );

    const [hours, minutes] = formData.reservation_time.split(":");

    const errors = [];

    if (!e.target.checkValidity()) {
      e.target.classList.add("was-validated");
    }

    // validate reservation date is not for a Tuesday
    if (reservationDate.getDay() === 2) {
      errors.push({
        message: "Sorrry, but the restaurant is closed on Tuesdays.",
      });
    }

    // validate reservation date is not in the past
    if (Date.parse(reservationDate) < Date.now()) {
      errors.push({
        message: "Reservations must be set after today.",
      });
    }

    // validate reservation time is not before opening time
    if ((hours <= 10 && minutes < 30) || hours < 9) {
      errors.push({
        message:
          "The earliest reservation time available is 10:30AM.  Please select a new time",
      });
    }

    // validate reservation is not made after 9:30 pm
    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      errors.push({
        message:
          "The latest reservation time is 9:30 PM.  Please select a new time.",
      });
    }

    // validate party size selection
    if (formData.people < 1) {
      errors.push({
        message: "Reservations must have at least one person.",
      });
    }

    setFormErrors(errors);

    !errors.length &&
      createReservation(formData, abortController.signal)
        .then((_) => {
          //redirect to the dashboard with date of reservation newly created
          history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch((error) => console.log(error));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));

  return (
    <>
      <div>
        <h1>Make a Reservation</h1>
      </div>
      {displayErrors}
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </>
  );
}
