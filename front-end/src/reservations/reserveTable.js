import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });

  const [error, setError] = useState(null);
  const abortController = useMemo(() => new AbortController(), []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    formData.people = Number(formData.people);

    try {
      await createReservation(formData, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  return (
    <div>
      <ErrorAlert error={error} />
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
}

export default NewReservation;
