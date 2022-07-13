import React, { useState } from "react";

export default function NewRes() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  console.log(formData);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitted!");
  };

  return (
    <>
      <h1>New Reservation</h1>
      <form onSubmit={submitHandler}>
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First name"
              onChange={changeHandler}
              value={formData.first_name}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last name"
              onChange={changeHandler}
              value={formData.last_name}
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
              onChange={changeHandler}
              value={formData.mobile_number}
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="reservation_date"
              className="form-control"
              onChange={changeHandler}
              value={formData.reservation_date}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <input
              type="time"
              name="reservation_time"
              className="form-control"
              onChange={changeHandler}
              value={formData.reservation_time}
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="people"
              className="form-control"
              min="1"
              placeholder="1"
              onChange={changeHandler}
              value={formData.people}
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
