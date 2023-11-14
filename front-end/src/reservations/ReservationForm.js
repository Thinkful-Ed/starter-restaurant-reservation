import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReservationForm() {
  const history = useHistory();
  const initialFormData = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    reservationDate: "",
    reservationTime: "",
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

    if (!validateExists(formData["firstName"])) {
      errors.firstName = "Please enter your first name.";
    }

    if (!validateExists(formData["lastName"])) {
      errors.lastName = "Please enter your last name.";
    }
    if (!validateExists(formData["mobileNumber"])) {
      errors.mobileNumber = "Please enter your mobile number.";
    }
    if (!validateExists(formData["reservationDate"])) {
      errors.reservationDate = "Please enter your reservation date.";
    }
    if (!validateExists(formData["reservationTime"])) {
      errors.reservationTime = "Please enter your reservation time.";
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

    setFormData(initialFormData);
    history.push(`/dashboard`);
  };

  return (
    <div>
      <h1>Reservation Form</h1>
      <form>
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={onChangeHandler}
            value={formData.firstName}
          />
        </label>
        <label htmlFor="lastName">
          Last name
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={onChangeHandler}
            value={formData.lastName}
          />
        </label>
        <label htmlFor="mobileNumber">
          Mobile Number
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            onChange={onChangeHandler}
            value={formData.mobileNumber}
          />
        </label>
        <label htmlFor="reservationDate">
          Date of Reservation
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            onChange={onChangeHandler}
            value={formData.reservationDate}
          />
        </label>
        <label htmlFor="reservationTime">
          Time of Reservation
          <input
            type="time"
            id="reservationTime"
            name="reservationTime"
            onChange={onChangeHandler}
            value={formData.reservationTime}
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
