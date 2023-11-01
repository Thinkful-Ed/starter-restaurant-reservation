import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({
  newReservation,
  setNewReservation,
  handleSubmit,
  changeHandler,
}) {
  let history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          type="text"
          value={newReservation.first_name}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label className="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          type="text"
          value={newReservation.last_name}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label className="mobile_number">Mobile Number</label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="text"
          value={newReservation.mobile_number}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label className="reservation_date">Reservation Date</label>
        <input
          name="reservation_date"
          id="reservation_date"
          type="date"
          value={newReservation.reservation_date}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label className="reservation_time">Reservation Time</label>
        <input
          name="reservation_time"
          id="reservation_time"
          type="time"
          value={newReservation.reservation_time}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label className="people">Number of People</label>
        <input
          name="people"
          id="people"
          type="number"
          value={newReservation.people}
          onChange={changeHandler}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push("/")}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default ReservationForm;
