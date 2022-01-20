import React, { useState } from "react";
import { today } from "../utils/date-time"

function ReservationForm({
  submitHandler,
  onCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: "1",
    status: "booked",
  },
}) {
  const [reservation, setReservation] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    submitHandler(reservation);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="deck-edit">
        <fieldset>
          <div className="row">
            <div className="form-group col">
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
            <div className="form-group col">
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
            <div className="form-group col">
              <label htmlFor="mobile_number">Mobile number</label>
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                className="form-control"
                value={reservation.mobile_number}
                required={true}
                placeholder="000-000-0000"
                maxLength="12"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="row">

            <div className="form-group col">
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
            <div className="form-group col">
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
            <div className="form-group col">
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
        </fieldset>
      </form>
    </div>
  );
}

export default ReservationForm;
