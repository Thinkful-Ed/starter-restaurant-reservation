import React from "react";

function CreateReservation() {
  return (
    <React.Fragment>
      <form>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault01"
              placeholder="First name"
              value
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault02"
              placeholder="Last name"
              value
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="validationDefaultUsername"
              placeholder="Username"
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="reservation_date">Date</label>
            <input
              type="date"
              className="form-reservation_date"
              id="reservation_date"
              placeholder="yyy-mm-dd"
              pattern="\d{4}-\d{2}-\d{4}"
              value
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault04">Time</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault04"
              placeholder="State"
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault05">People</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault05"
              placeholder="Zip"
              required
            />
          </div>
        </div>
        <button className="btn btn-secondary" type="submit">
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateReservation;
