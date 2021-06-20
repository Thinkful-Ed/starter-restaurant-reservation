import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { today } from "../utils/date-time";
import ErrorAlert from "./ErrorAlert";
const newToday = today();
function NewReservation() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState({ ...initialFormData });
  const [error, setError] = useState(null);
  const [validDate, setValidDate] = useState(true);
  const [validTime, setValidTime] = useState(true);
  let history = useHistory();

  function formatDate(date) {
    //returns mm/dd/yyyy from yyyy/mm/dd
    return `${date[5]}${date[6]}-${date[8]}${date[9]}-${date[0]}${date[1]}${date[2]}${date[3]}`;
  }

  function validReservationDates({ target }) {
    // dates must be in converted from yyyy/mm/dd to mm/dd/yyyy for Date.prototype conversion
    const dateChosen = new Date(formatDate(target.value));
    const today = new Date(formatDate(newToday));
    console.log(dateChosen, today);
    const isNotTuesday = dateChosen.getDay() !== 2; // 2 = tuesday's index
    const isThisDayOrAfter = dateChosen.getDate() >= today.getDate();
    const isThisMonthOrAfter = dateChosen.getMonth() >= today.getMonth();
    const isThisYearOrAfter = dateChosen.getFullYear() >= today.getFullYear();
    if (
      isNotTuesday &&
      isThisDayOrAfter &&
      isThisMonthOrAfter &&
      isThisYearOrAfter
    ) {
      setValidDate(true);
      setReservation(
        (form) => (form = { ...form, reservation_date: target.value })
      );
    } else {
      setReservation(
        (form) => (form = { ...form, reservation_date: "" })
      );
      setValidDate(false);
    }
  }

  function validReservationTimes({ target }) {
    //times must be in hh/mm format
    let timeChosen = target.value;
    let chosenMinutes = Number(`${timeChosen[3]}${timeChosen[4]}`);
    let chosenHour = Number(`${timeChosen[0]}${timeChosen[1]}`);
    const MintoNextHalfHour = 30 - chosenMinutes;
    timeChosen = timeChosen.split("");
    timeChosen = timeChosen.splice(0, 2);

    const currentTime = new Date(Date.now());
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (chosenMinutes === 30) {
      timeChosen = `${timeChosen.join("")}:${chosenMinutes}`;
    } else if (chosenMinutes === 0) {
      timeChosen = `${timeChosen.join("")}:${chosenMinutes}0`;
    } else if (MintoNextHalfHour > 0) {
      timeChosen = `${timeChosen.join("")}:30`;
      chosenMinutes = 30;
    } else if (MintoNextHalfHour < 0) {
      chosenHour = Number(timeChosen.join("")) + 1;
      timeChosen = `${chosenHour}:00`;
      chosenMinutes = 0;
    }

    //return error message if chosen time is outsisde operating hours
    if (
      (chosenHour === 21 && chosenMinutes === 30) ||
      chosenHour > 21 ||
      (chosenHour === 10 && chosenMinutes === 0) ||
      chosenHour < 10
    ) {
      setReservation(
        (form) => (form = { ...form, reservation_time: "" })
      )
      return setValidTime(false);
    }

    // if the chosen hour is later than the current hour (current hour is less than chosen hour) set reservation time
    if (currentHour < chosenHour) {
      setValidTime(true);
      setReservation(
        (form) => (form = { ...form, reservation_time: timeChosen })
      );
    }
    // if the chosen hour is earlier than the current hour (current hour is greater than the chosen hour ) display error message
    else if (currentHour > chosenHour) {
      setValidTime(false);
    }
    // if hours are the same check minutes
    else {
      // if the chosen minute is later than the current minute ( current minute is less than the chosen minute ) set reservation time
      if (currentMinute < chosenMinutes) {
        setValidTime(true);
        setReservation(
          (form) => (form = { ...form, reservation_time: timeChosen })
        );
      }
      // if the chosen minute is earlier than the current minute (current minute is greater than chosen minute) display error message
      else {
        setValidTime(false);
      }
    }
  }

  function handleChange({ target: {name, value} }) {
    setReservation({ ...reservation, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createReservation(reservation)
      .then(setReservation((form) => (form = { ...initialFormData })))
      .then(history.push(`/dashboard?date=${reservation.reservation_date}`))
      .catch(setError);
  }

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            onChange={handleChange}
            name="first_name"
            value={reservation.first_name}
            required={true}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            onChange={handleChange}
            name="last_name"
            value={reservation.last_name}
            required={true}
          />
        </label>
        <label>
          Mobile Number
          <input
            type="text"
            onChange={handleChange}
            name="mobile_number"
            value={reservation.mobile_number}
            required={true}
          />
        </label>
        <label>
          Party Size
          <input
            type="text"
            onChange={handleChange}
            name="people"
            value={reservation.people}
            required={true}
          />
        </label>
        <label>
          Date of Reservation
          <input
            type="date"
            onChange={validReservationDates}
            name="reservation_date"
            value={reservation.reservation_date}
            required={true}
          ></input>
        </label>
        <div>
          {validDate ? null : (
            <p className="alert alert-danger">
              Please enter a valid date. (We are closed on tuesdays)
            </p>
          )}
        </div>
        <label>
          Time of Reservation
          <input
            type="time"
            step="300"
            min="10:30"
            max="21:30"
            onChange={validReservationTimes}
            name="reservation_time"
            value={reservation.reservation_time}
            required={true}
          ></input>
        </label>
        <div>
          {validTime ? null : (
            <p className="alert alert-danger">
              Please enter a valid time. (We reserve tables from 10:30AM to
              9:30PM on every half hour.)
            </p>
          )}
        </div>
        <button type="submit">Submit</button>
        <button type="reset">Cancel</button>
      </form>
    </div>
  );
}

export default NewReservation;
