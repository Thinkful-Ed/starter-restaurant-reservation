import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
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

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createReservation(formData)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(console.log);
    history.push(`/dashboard?date=${formData.reservation_date}`);
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // the normal submit refreshes the entire page.
  //   history.push(`/dashboard?date=${formData.reservation_date}`); // the push function literally "pushes" the user to whatever path you give.
  //   //console.log("submit button", reservation);
  // };
  
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
                  onChange={handleChange} // the function we just made! the onChange attribute will automatically pass the `event` argument based off of which input was clicked
                  value={formData.first_name} // we can use our useState hook to store the values of each input now
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
        </form>
      </div>
      <form>
        <fieldset>
          <div className="action-buttons">
            <button
              type="cancel"
              className="btn btn-secondary"
              onClick={history.goBack}
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
        </fieldset>
      </form>
    </main>
  );
}
