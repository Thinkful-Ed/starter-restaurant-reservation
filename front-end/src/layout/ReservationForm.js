import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleSubmit, handleChange, formData }) {
  const history = useHistory();

  return (
    <div>
      <h1>Create Reservation</h1>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.first_name}
              required
            ></input>
          </div>
          <div className="col">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              required
            ></input>
          </div>
          <div className="col">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              placeholder="Mobile Number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            ></input>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="reservation_date">Date</label>

            <input
              type="date"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="reservation_time">Time</label>

            <input
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="col">
            <label htmlFor="people">People</label>

            <input
              type="number"
              className="form-control"
              id="people"
              name="people"
              value={formData.people}
              placeholder="Number of Guests"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="cancel"
          className="btn btn-secondary"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-info mx-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
