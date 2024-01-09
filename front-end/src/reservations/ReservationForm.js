import React from "react";
import { Link } from "react-router-dom";

function ReservationForm({
  handleSubmit,
  handleChange,
  newReservation,
  reservationId,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">
            First Name
            <input
              type="text"
              id="first-name"
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              value={newReservation.firstName}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last-name">
            Last Name
            <input
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
              value={newReservation.lastName}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="mobile-number">
            Mobile Number
            <input
              type="text"
              id="mobile-number"
              name="mobileNumber"
              placeholder="555-555-5555"
              required
              onChange={handleChange}
              value={newReservation.mobileNumber}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="date">
            Reservation Date
            <input
              type="text"
              id="date"
              name="date"
              required
              placeholder="DD/MM/YYYY"
              onChange={handleChange}
              value={newReservation.date}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="time">
            Reservation Time
            <input
              type="text"
              id="time"
              name="time"
              placeholder="HH:MM"
              required
              onChange={handleChange}
              value={newReservation.time}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="party-size">
            Party Size
            <input
              type="number"
              id="partySize"
              name="partySize"
              placeholder="2"
              required
              onChange={handleChange}
              value={newReservation.partySize}
              className="form-control"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={`/dashboard`} className="btn btn-secondary mx-1">
          Cancel
        </Link>
      </form>
    </>
  );
}

export default ReservationForm;
