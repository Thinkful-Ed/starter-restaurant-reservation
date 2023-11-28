import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";

function ReservationForm() {
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isTuesday, setIsTuesday] = useState(false);
  const [isPastDate, setIsPastDate] = useState(false);
  const [isInvalidTime, setIsInvalidTime] = useState(false);

  const validateReservationDate = (date) => {
    setIsTuesday(false);
    setIsPastDate(false);
    const dateAsDateObject = new Date(date);
    if (dateAsDateObject.getDay() === 1) {
      setIsTuesday(true);
      return false;
    }
    const today = new Date();
    if (dateAsDateObject < today) {
      setIsPastDate(true);
      return false;
    }
    return true;
  };

  const validateReservationTime = (time) => {
    setIsInvalidTime(false);
    const timeSplit = time.split(":");
    const reservationHour = Number(timeSplit[0]);
    const reservationMinutes = Number(timeSplit[1]);
    if (
      reservationHour < 10 ||
      (reservationHour === 10 && reservationMinutes < 30)
    ) {
      setIsInvalidTime(true);
      return false;
    }
    if (
      reservationHour > 21 ||
      (reservationHour === 21 && reservationMinutes >= 31)
    ) {
      setIsInvalidTime(true);
      return false;
    }
    return true;
  };

  const onChangeHandler = (event) => {
    setIsInvalidTime(false);
    setIsPastDate(false);
    setIsTuesday(false);
    const property = event.target.name;
    const value =
      property === "people" ? Number(event.target.value) : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const validateExists = (value) => {
    if (typeof value === "number") {
      return value;
    }
    return value && value.trim();
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!validateExists(formData["first_name"])) {
      errors.first_name = "Please enter your first name.";
    }

    if (!validateExists(formData["last_name"])) {
      errors.last_name = "Please enter your last name.";
    }
    if (!validateExists(formData["mobile_number"])) {
      errors.mobile_number = "Please enter your mobile number.";
    }
    if (!validateExists(formData["reservation_date"])) {
      errors.reservation_date = "Please enter your reservation date.";
    }
    if (!validateExists(formData["reservation_time"])) {
      errors.reservation_time = "Please enter your reservation time.";
    }
    if (!validateExists(formData["people"])) {
      errors.people = "Please enter your party size.";
    }

    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let errors = {};
    errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      //Displays any errors
      Object.keys(errors).forEach((key) => {
        //Find the specific error element
        alert(errors[key]);
      });
      return false;
    }

    if (!validateReservationTime(formData["reservation_time"])) {
      return false;
    }

    if (!validateReservationDate(formData["reservation_date"])) {
      return false;
    }

    createReservation(formData)
      .then(() => {
        setFormData(initialFormData);
      })
      .then(() => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      });
  };

  return (
    <div>
      <h1>Reservation Form</h1>
      <form>
        <label htmlFor="first_name">
          First Name
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={onChangeHandler}
            value={formData.first_name}
          />
        </label>
        <label htmlFor="last_name">
          Last name
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={onChangeHandler}
            value={formData.last_name}
          />
        </label>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          onChange={onChangeHandler}
          value={formData.mobile_number}
        />
        <label htmlFor="reservation_date">Date of Reservation</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          onChange={onChangeHandler}
          value={formData.reservation_date}
        />
        {isTuesday ? (
          <div className="alert alert-danger">
            We're sorry, the restaurant is closed on Tuesdays. Please choose a
            reservation date on another day of the week.
          </div>
        ) : (
          <></>
        )}
        {isPastDate ? (
          <div className="alert alert-danger">
            You cannot make a reservation for a past date. Please choose a
            future date.
          </div>
        ) : (
          <></>
        )}
        <label htmlFor="reservation_time">Time of Reservation</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          onChange={onChangeHandler}
          value={formData.reservation_time}
        />
        {isInvalidTime ? (
          <div className="alert alert-danger">
            We're sorry. Our resturant opens at 10:30AM and takes reservations
            until 9:30PM. Please choose a reservation time within our available
            hours.
          </div>
        ) : (
          <></>
        )}
        <label htmlFor="people">Number of People in the party</label>
        <input
          type="number"
          id="people"
          name="people"
          onChange={onChangeHandler}
          value={String(formData.people)}
        />
        {formData.people}
        <div>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
