import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  createReservation,
  updateReservation,
  readReservation,
} from "../utils/api";
import { formatAsDate } from "../utils/date-time";

export default function ReservationForm({ reservation_id, eventType }) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_time: "",
    reservation_date: "",
    people: 0,
  };

  const [errorMessages, setErrorMessages] = useState("");
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();
  const ac = new AbortController();

  useEffect(() => {
    async function readReservationInfo() {
      try {
        const reservationInfo = await readReservation(
          reservation_id,
          ac.signal
        );

        reservationInfo.reservation_date = formatAsDate(
          reservationInfo.reservation_date
        );

        setFormData(reservationInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    reservation_id && readReservationInfo();
  }, [reservation_id]);

  function handleSubmit(event) {
    event.preventDefault();
    async function addReservationToList() {
      try {
        if (eventType === "create") {
          await createFunc();
        } else if (eventType === "edit") {
          await editFunc();
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          setErrorMessages(error.message);
          throw error;
        }
      }
    }
    addReservationToList();
    return () => ac.abort();
  }

  const createFunc = async () => {
    await createReservation(formData, ac.signal);
    history.push(`/dashboard?date=${formData.reservation_date}`);
  };

  const editFunc = async () => {
    await updateReservation(formData, ac.signal);
    history.push(`/dashboard?date=${formData.reservation_date}`);
  };

  function changeHandler(event) {
    let stateValue = event.target.value;

    if (event.target.name === "people" && stateValue) {
      stateValue = parseInt(stateValue, 10);
    }
    setFormData({ ...formData, [event.target.name]: stateValue });
  }

  return (
    <>
      {errorMessages && <li className="alert alert-danger">{errorMessages}</li>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> First Name</label>
          <input
            name="first_name"
            type="text"
            required={true}
            value={formData.first_name}
            onChange={changeHandler}
          />
          <label>Last Name</label>
          <input
            name="last_name"
            type="text"
            required={true}
            value={formData.last_name}
            onChange={changeHandler}
          />
          <label>Mobile Number</label>
          <input
            name="mobile_number"
            type="text"
            required={true}
            value={formData.mobile_number}
            onChange={changeHandler}
          />
          <label>Reservation Date</label>
          <input
            name="reservation_date"
            type="date"
            required={true}
            value={
              formData.reservation_date
                ? formatAsDate(formData.reservation_date)
                : ""
            }
            onChange={changeHandler}
          />
          <label>Reservation Time</label>
          <input
            name="reservation_time"
            type="time"
            required={true}
            value={formData.reservation_time}
            onChange={changeHandler}
          />
          <label>People</label>
          <input
            name="people"
            type="number"
            required={true}
            value={formData.people}
            onChange={changeHandler}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
