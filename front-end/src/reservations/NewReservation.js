import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import ErrorAlert from "../layout/ErrorAlert";
import { postReservation } from "../utils/api";
import { today } from "../utils/date-time"


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
    postReservation(inputData).then(() =>
      history.push(`/dashboard?date=${inputData.reservation_date}`)
    );

    //setInputData({...initialFormState});
  }

  function cancelHandler(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  }


  return (
    <>
      <div>
      <h1 >
        New Reservation
        </h1>
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
          required
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
          required
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
          required
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
          required
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
          required
        />
      </label>
      <br />
      <label htmlFor="people">
        Number of guests:
        <br />
        <input
          name="people"
          type="number"
          onChange={changeHandler}
          value={inputData.people}
          required
        />
      </label>
      <div>
      <br />
        <button
          className="btn btn-primary mr-2"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={cancelHandler}
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
