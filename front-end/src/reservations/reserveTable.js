import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  const [error, setError] = useState(null);
  const abortController = new AbortController();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createReservation(form, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }
  }

  useEffect(() => {
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <ErrorAlert error={error} />
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={form}
      />
    </div>
  );
}

export default NewReservation;


