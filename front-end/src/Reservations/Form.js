import React, { useState } from "react";
import { today } from "../utils/date-time"
// import { Link, useHistory, useParams } from "react-router-dom";

function ReservationForm({
  onSubmit,
  onCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: "1",
  },
}) {
  const [reservation, setReservation] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(reservation);
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="deck-edit">
        <fieldset>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="form-control"
              value={reservation.first_name}
              required={true}
              placeholder="First Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="form-control"
              value={reservation.last_name}
              required={true}
              placeholder="Last Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile number</label>
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              className="form-control"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={reservation.mobile_number}
              required={true}
              placeholder="000-000-0000"
              maxLength="12"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation date</label>
            <input
              type="date"
              id="reservation_date"
              name="reservation_date"
              className="form-control"
              value={reservation.reservation_date}
              required={true}
              onChange={changeHandler}
            />
            <small>Note: we are closed on Tuesdays</small>
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation time</label>
            <input
              type="time"
              id="reservation_time"
              name="reservation_time"
              className="form-control"
              value={reservation.reservation_time}
              required={true}
              placeholder="Reservation time"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Number in your party</label>
            <input
              type="number"
              id="people"
              name="people"
              className="form-control"
              value={reservation.people}
              required={true}
              placeholder="# in your party"
              min="1"
              onChange={changeHandler}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {console.log(reservation)}
        </fieldset>
      </form>
    </div>
  );
}

export default ReservationForm;
