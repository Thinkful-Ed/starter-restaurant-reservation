import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  createReservation,
  editReservation,
  listReservations,
} from "../utils/api";
//import Reservations from "./Reservations";

export default function NewReservation({ reservations }) {
  const history = useHistory();
  //useState hook to implement change on reservation information
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });
  //new state that contains errors
  //if no errors are found it will remain an empty array
  const [errors, setErrors] = useState([]);

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createReservation(formData)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(console.log);
    // if there are errors, we don't want to push the user onto a different page, we want them to stay on this page until the issue is resolved.
    if (validateDate()) {
      history.push(`/dashboard?date=${formData.reservation_date}`);
    }
  }

  function validateDate() {
    const reserveDate = new Date(formData.reservation_date);
    //comparing the reservation to todays date
    const todaysDate = new Date();
    //variable with an empty array to hold all of the errors made if someone tries to book for Tuesday
    const foundErrors = [];
    //checking the condition to see if the person is booking for Tuesday
    if (reserveDate.getDay() === 2) {
      //The restaurant is closed Tuesday, so any reservations made for that day will present an error
      foundErrors.push({
        message:
          "Reservations cannot be made on a Tuesday (Restaurant is closed).",
      });
    }
    if (todaysDate > reserveDate) {
      foundErrors.push({
        message: "Reservation cannot be made: Date is in the past.",
      });
    }
    setErrors(foundErrors);
    //use foundErrors array to see if there is any problems
    if (foundErrors.length > 0) {
      return false;
    }
    // if returned true that means our reservations is valid
    return true;
  }

  return (
    <main>
      <div className="header">
        <h1>Create A New Reservation</h1>
      </div>
      <div className="d-md-flex mb-3">
        <form>
          <fieldset>
            <legend>Customer Information:</legend>
            <div className="name_info">
              <div className="form-group">
                <label htmlFor="first_name">First Name:&nbsp;</label>
                <input
                  name="first_name"
                  id="first_name"
                  type="text"
                  title="Enter your first name"
                  placeholder="Enter your first name"
                  className="form-control"
                  onChange={handleChange} //the function we just made! the onChange attribute will automatically pass the `event` argument based off of which input was clicked
                  value={formData.first_name} //we can use our useState hook to store the values of each input now
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name:&nbsp;</label>
                <input
                  name="last_name"
                  id="last_name"
                  type="text"
                  title="Enter your last name"
                  placeholder="Enter your last name"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.last_name}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number:&nbsp;</label>
                <input
                  name="mobile_number"
                  id="mobile_number"
                  type="tel"
                  title="Enter your mobile phone number"
                  placeholder="Enter your mobile phone number"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.mobile_number}
                  required
                ></input>
              </div>
            </div>
            <div className="party_info">
              <div className="form-group">
                <label htmlFor="reservation_date">
                  Reservation Date:&nbsp;
                </label>
                <input
                  name="reservation_date"
                  id="reservation_date"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.reservation_date}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="reservation_time">
                  Reservation Time:&nbsp;
                </label>
                <input
                  name="reservation_time"
                  id="reservation_time"
                  type="time"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.reservation_time}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="people">Party Size:&nbsp;</label>
                <input
                  name="people"
                  id="people"
                  type="text"
                  title="Total number of your party"
                  className="form-control"
                  placeholder="Number of guest in the party"
                  onChange={handleChange}
                  value={formData.people}
                  required
                ></input>
              </div>
            </div>
          </fieldset>
          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
