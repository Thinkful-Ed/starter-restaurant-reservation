import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api.js";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "./ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    const ac = new AbortController();
    formData.people = Number(formData.people);
    createReservation({ data: formData }, ac.signal)
      .then(() => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch(setErrorMessage);
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const goHome = () => {
    history.goBack();
  };

  const reload = () => {
    window.location.reload();
  };

  if (errorMessage) {
    return (
      <div>
        <ErrorAlert error={errorMessage} />
        <button type="button" class="btn btn-info ml-2" onClick={goHome}>
          Home Page
        </button>
        <button type="button" class="btn btn-info ml-2" onClick={reload}>
          Try Again
        </button>
      </div>
    );
  } else {
    return (
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    );
  }
}

export default NewReservation;
