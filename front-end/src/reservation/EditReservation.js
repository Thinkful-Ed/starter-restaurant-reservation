import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listReservations, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./reservationForm";

function EditReservation() {
  const history = useHistory();
  const params = useParams();
  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    status: "booked",
  };
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [currentReservation, setCurrentReservation] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listReservations({})
      .then((response) => {
        setReservations(response);
      })
      .catch(setError);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (reservations.length > 0) {
      const current = reservations.find(
        (reservation) =>
          reservation.reservation_id === Number(params.reservation_id)
      );
      setCurrentReservation(current);
      setForm(current);
    }
  }, [reservations, params]);

  function changeHandler({ target: { name, value } }) {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    const updatedReservation = { ...form };
    updatedReservation.people = Number(updatedReservation.people);
    updateReservation(updatedReservation, currentReservation.reservation_id)
      .then(() => {
        history.push(`/dashboard?date=${form.reservation_date}`);
      })
      .catch(setError);
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <h2>Edit Reservation:</h2>
      <ReservationForm
        newReservation={form}
        setNewReservation={setForm}
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
      />
    </div>
  );
}

export default EditReservation;
