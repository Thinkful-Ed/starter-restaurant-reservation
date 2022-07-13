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
              type="number"
              name="mobile_number"
              className="form-control"
              placeholder="Mobile number"
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
        </div>
      </form>
    </>
  );
}
