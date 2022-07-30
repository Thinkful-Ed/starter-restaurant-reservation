import React from "react";
import { Link } from "react-router-dom";

export default function FormComponent({
  submitHandler,
  changeHandler,
  reservation,
  formData,
}) {
  if (reservation) {
    return (
      <form onSubmit={submitHandler} className="container">
        <fieldset>
          <h4 className="mt-3 mb-2">Edit Your Reservation!</h4>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                required={true}
                value={reservation.first_name}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                required={true}
                value={reservation.last_name}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="text"
                name="mobile_number"
                placeholder="Mobile #"
                required={true}
                value={reservation.mobile_number}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="reservation_date">Reservation Date</label>
              <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                name="reservation_date"
                placeholder="YYYY-MM-DD"
                required={true}
                value={reservation.reservation_date}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                pattern="[0-9]{2}:[0-9]{2}"
                name="reservation_time"
                placeholder="HH:MM"
                required={true}
                value={reservation.reservation_time}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="people">Party Size</label>
              <input
                type="number"
                name="people"
                placeholder="Party Size"
                required={true}
                min="1"
                value={reservation.people}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <Link to={`/dashboard`}>
            <button className="btn btn-secondary mr-2 cancel">
              <span className="oi oi-x"></span>&nbsp; Cancel
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-check"></span>&nbsp; Submit
          </button>
        </fieldset>
      </form>
    );
  } else
    return (
      <form onSubmit={submitHandler} className="container">
        <fieldset>
          <h4 className="mt-3 mb-2">Your Reservation Awaits!</h4>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                required={true}
                value={formData.first_name}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                required={true}
                value={formData.last_name}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="text"
                name="mobile_number"
                placeholder="Mobile #"
                required={true}
                value={formData.mobile_number}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="reservation_date">Reservation Date</label>
              <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                name="reservation_date"
                placeholder="YYYY-MM-DD"
                required={true}
                value={formData.reservation_date}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col ">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                pattern="[0-9]{2}:[0-9]{2}"
                name="reservation_time"
                placeholder="HH:MM"
                required={true}
                value={formData.reservation_time}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="people">Party Size</label>
              <input
                type="number"
                name="people"
                placeholder="Party Size"
                required={true}
                min="1"
                value={formData.people}
                onChange={changeHandler}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <Link to={`/dashboard`}>
            <button className="btn btn-secondary mr-2 cancel">
              <span className="oi oi-x"></span>&nbsp; Cancel
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-check"></span>&nbsp; Submit
          </button>
        </fieldset>
      </form>
    );
}