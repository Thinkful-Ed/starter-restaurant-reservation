import React from "react";

export default function NewRes() {
  return (
    <>
      <form>
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <input
              type="tel"
              name="mobile_number"
              className="form-control"
              placeholder="Mobile number"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="reservation_date"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <input
              type="time"
              name="reservation_time"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="people"
              className="form-control"
              min="1"
              placeholder="1"
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button className="btn btn-secondary ml-2">Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
}
