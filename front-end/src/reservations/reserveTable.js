import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation({ reservatations, error, setError, setReservation }) {
  const history = useHistory();
  const abortController = new AbortController()
  const signal = abortController.signal;
  const [reservationsError, setReservationsError] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  function handleChange(e){
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    form.people = Number(form.people)

    

  }
}
