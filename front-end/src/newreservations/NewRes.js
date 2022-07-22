import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate, formatAsTime } from "../utils/date-time";

export default function NewRes({ today }) {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState(null);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(typeof formData.people, formData.people);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abort = new AbortController();

    const formatedData = {
      ...formData,
      people: parseInt(formData.people),
      reservation_date: formatAsDate(formData.reservation_date),
      reservation_time: formatAsTime(formData.reservation_time),
    };

    try {
      await createReservation(formatedData, abort.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const errorElement = () => {
    return (
      <>
        <p>ERROR: {errorMessage.message}</p>
      </>
    );
  };

  return (
    <>
      <h1>Create Reservation</h1>
      {errorMessage && errorElement()}
      <form onSubmit={submitHandler}>
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First name"
              required={true}
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
              required={true}
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
              required={true}
              onChange={changeHandler}
              value={formData.mobile_number}
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="reservation_date"
              className="form-control"
              required={true}
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
              required={true}
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
              placeholder="Number of people in party"
              required={true}
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
            <button onClick={cancelHandler} className="btn btn-secondary ml-2">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
