import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
//import ErrorAlert from "../layout/ErrorAlert";
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
    people: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [inputData, setInputData] = useState({ ...initialFormState });
  console.log(inputData);

  //changeHandler to make inputs controlled
  //get access to the values in the inputs
  function changeHandler({ target }) {
    setInputData({ ...inputData, [target.name]: target.value });
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

  return (
    <>
      <div>
        <h1>New Reservation</h1>
      </div>
      <div className="d-flex">
        <form>
          <label htmlFor="first_name">
            First name:
            <br />
            <input
              name="first_name"
              id="last_name"
              type="text"
              onChange={changeHandler}
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
              value={inputData.people}
              pattern="[0-9]+"
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
      <ErrorAlert error={errorMessage} />
    </>
  );
}

export default NewReservation;
