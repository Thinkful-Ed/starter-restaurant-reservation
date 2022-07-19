import React from "react";
import { useHistory } from "react-router-dom";

 function ReservationForm({handleSubmit, handleChange, formData}){
    const history = useHistory();

    return(
        <div>
      <h1>Create Reservation</h1>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label for="first_name">First Name</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.first_name}
              required
            ></input>
          </div>
          <div className="col">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              required
            ></input>
          </div>
          <div className="col">
            <label for="mobile_number">Mobile Number</label>
            <input
              type="text"
              class="form-control"
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
            <label for="reservation_date">Date</label>

            <input
              type="date"
              class="form-control"
              id="reservation_date"
              name="reservation_date"
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label for="reservation_time">Time</label>

            <input
              type="time"
              class="form-control"
              id="reservation_time"
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="col">
            <label for="people">People</label>

            <input
              type="number"
              class="form-control"
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
          class="btn btn-secondary"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary mx-3">
          Submit
        </button>
      </form>
    </div>
    )
}

export default ReservationForm;