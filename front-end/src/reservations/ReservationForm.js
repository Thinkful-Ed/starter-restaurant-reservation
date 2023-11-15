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
    people: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const validateExists = (value) => {
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

    createReservation(formData)
      .then(() => {
        setFormData(initialFormData);
      })
      .then(() => {
        history.push(`/dashboard`);
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
        <label htmlFor="mobile_number">
          Mobile Number
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            onChange={onChangeHandler}
            value={formData.mobile_number}
          />
        </label>
        <label htmlFor="reservation_date">
          Date of Reservation
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            onChange={onChangeHandler}
            value={formData.reservation_date}
          />
        </label>
        <label htmlFor="reservation_time">
          Time of Reservation
          <input
            type="time"
            id="reservation_time"
            name="reservation_time"
            onChange={onChangeHandler}
            value={formData.reservation_time}
          />
        </label>
        <label htmlFor="people">
          Number of People in the party
          <input
            type="number"
            id="people"
            name="people"
            onChange={onChangeHandler}
            value={formData.people}
          />
        </label>
        <div>
          <button onClick={cancelHandler}>Cancel</button>
          <button onClick={submitHandler}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
