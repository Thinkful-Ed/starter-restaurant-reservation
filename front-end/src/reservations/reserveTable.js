import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation({ reservatations, error, setError, setReservation }) {
  const history = useHistory();
  const formData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [form, setForm] = useState({ ...formData });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <ReservationForm 
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      />
    </div>
  )

}
