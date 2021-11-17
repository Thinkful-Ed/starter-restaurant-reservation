import React from "react";
import { useHistory } from "react-router-dom";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/submit";

function Form({ date }) {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set up query param for reservation date
    history.go(`/dashboard?date=${date}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="first_name">First Name</label>
          <input
            className="form-control"
            id="first_name"
            placeholder="First Name"
          />
          <label for="last_name">Last Name</label>
          <input
            className="form-control"
            id="last_name"
            placeholder="Last Name"
          />
          <label for="mobile_number">Mobile Name</label>
          <input
            className="form-control"
            id="mobile_number"
            placeholder="Mobile Number"
          />
        </div>
        <div className="form-group">
        <label for="reservation_date">Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            placeholder="mm/dd/yyyy"
          />
          <label for="reservation_time">Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            placeholder="--:-- --"
          />
          <label for="people">People</label>
          <input
            className="form-control"
            id="people"
          />
        </div>
        <Cancel />
        <Submit />
      </form>
    </div>
  );
}

export default Form;
