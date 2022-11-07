import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const initFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const { reservation_id } = useParams();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initFormData);
 
  const history = useHistory()
  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    async function listReservations(){
      try {
        setFormData(await getReservation(reservation_id, abortController.signal))
      } catch (error) {
        setError(error)
      }
    }
    listReservations()
    return ()=> abortController.abort()
  }

  // async function loadReservation() {
  //   try {
  //     const abortController = new AbortController();
  //     const reservation = await getReservation(reservation_id, abortController.signal)
  //     setFormData(reservation);
  //   } catch (error) {
  //     setError(error);
  //   }
  // }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
        const abortController = new AbortController()
        await updateReservation(formData, reservation_id, abortController.signal)
        history.push(`/dashboard?date=${formatAsDate(formData.reservation_date)}`)
    } catch (error) {
        setError(error)
    }
  };

  const cancelHandler = () => {
    history.push(`/reservations?date=${formatAsDate(formData.reservation_date)}`)
  }

  return (
    <div>
      <h2>Edit a reservation:</h2>
      <ErrorAlert error={error} />
      <ReservationForm
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        reservation={formData}
        setReservation={setFormData}
      />
    </div>
  );
}

export default EditReservation;
