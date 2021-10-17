import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { postReservation } from "../utils/api";
import { today } from "../utils/date-time";

function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [inputData, setInputData] = useState({ ...initialFormState });

  //changeHandler to make inputs controlled
  //get access to the values in the inputs
  function changeHandler({ target }) {
    setInputData({
      ...inputData,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    //have to validate (separate fxn)
    postReservation(inputData)
      .then(() => history.push(`/dashboard?date=${inputData.reservation_date}`))
      .catch(setErrorMessage);
  }

  function cancelHandler(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  }

  //JSX
  return (
    <>
      <div>
        <h1 className="mt-3 mb-4">New Reservation</h1>
        <ErrorAlert error={errorMessage} />
      </div>
      <div className="d-flex justify-content-center">
        <form>
          <label htmlFor="first_name">
            First name:
            <br />
            <input
              name="first_name"
              id="last_name"
              type="text"
              onChange={changeHandler}
              className="form-control"
              value={inputData.first_name}
              required={true}
            />
          </label>
          <br />
          <label htmlFor="last_name">
            Last name:
            <br />
            <input
              name="last_name"
              id="last_name"
              type="text"
              onChange={changeHandler}
              className="form-control"
              value={inputData.last_name}
              required={true}
            />
          </label>
          <br />
          <label htmlFor="mobile_number">
            Mobile number:
            <br />
            <input
              name="mobile_number"
              id="mobile_number"
              type="text"
              onChange={changeHandler}
              className="form-control"
              value={inputData.mobile_number}
              required={true}
            />
          </label>
          <br />
          <label htmlFor="reservation_date">
            Reservation date:
            <br />
            <input
              name="reservation_date"
              id="reservation_date"
              type="date"
              onChange={changeHandler}
              className="form-control"
              value={inputData.reservation_date}
              required={true}
            />
          </label>
          <br />
          <label htmlFor="reservation_time">
            Reservation time:
            <br />
            <input
              name="reservation_time"
              id="reservation_time"
              type="time"
              onChange={changeHandler}
              className="form-control"
              value={inputData.reservation_time}
              required={true}
            />
          </label>
          <br />
          <label htmlFor="people">
            Number of guests:
            <br />
            <input
              id="people"
              name="people"
              type="number"
              onChange={changeHandler}
              className="form-control"
              value={inputData.people}
              min="1"
              required={true}
            />
          </label>
          <div>
            <br />
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onClick={submitHandler}
              value="Submit"
            >
              Submit
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={cancelHandler}
              value="Cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewReservation;
