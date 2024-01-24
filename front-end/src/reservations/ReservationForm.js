import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({
  handleSubmit,
  handleChange,
  reservation,
}) {
  const history = useHistory();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">
            First Name
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              required
              onChange={handleChange}
              value={reservation.first_name}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">
            Last Name
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              required
              onChange={handleChange}
              value={reservation.last_name}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">
            Mobile Number
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              placeholder="555-555-5555"
              required
              onChange={handleChange}
              value={reservation.mobile_number}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">
            Reservation Date
            <input
              type="date"
              id="reservation_date"
              name="reservation_date"
              required
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
              value={reservation.reservation_date}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">
            Reservation Time
            <input
              type="time"
              id="reservation_time"
              name="reservation_time"
              placeholder="HH:MM:SS"
              required
              onChange={handleChange}
              value={reservation.reservation_time}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="people">
            Party Size
            <input
              type="number"
              id="people"
              name="people"
              placeholder="2"
              required
              onChange={handleChange}
              value={reservation.people}
              className="form-control"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={() => history.push("/")}
          className="btn btn-secondary mx-1"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default ReservationForm;
