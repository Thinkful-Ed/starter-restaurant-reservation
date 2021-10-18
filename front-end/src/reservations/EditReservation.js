import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { today, formatAsTime } from "../utils/date-time";
import {
  postReservation,
  updateReservation,
  getReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const { reservation_id } = useParams();
  const [reservationsError, setReservationError] = useState(null);
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: formatAsTime(new Date().toTimeString()),
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  // load reservation details from url param and fill form
  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setReservationError);

    return () => abortController.abort();
  }, [reservation_id]);

  const changeHandler = ({ target }) => {
    let value = target.value;

    // Fixes issue of *people* changing into a string
    if (target.name === "people" && typeof value === "string") {
      value = +value;
    }

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

/*Callback function for submit button action.*/
  const submitHandler = (event) => {
    event.preventDefault();
    submitEdit();
    const abortController = new AbortController();
    postReservation(formData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setReservationError);

    return () => abortController.abort();
  };

  /*Function makes a POST request to the API to update a reservation data.*/
  const submitEdit = () => {
    const abortController = new AbortController();
    setReservationError(null);
   /* this data is trims the reservation_id from the data so that an attempt to update the primary key is not made*/
    const trimmedFormData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      people: formData.people,
      mobile_number: formData.mobile_number,
      reservation_date: formData.reservation_date,
      reservation_time: formData.reservation_time,
    };
  /*found in utils*/
    updateReservation(reservation_id, trimmedFormData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setReservationError);

    return () => abortController.abort();
  };

  /*Callback function for cancel button action.*/
  const cancelHandler = (event) => {
    event.preventDefault();
    // cancelling a new reservation while in progress sends user back to previous page.
    history.goBack();
  };
  
/*JSX renders edit reservation form*/
  return (
    <>
      <h1 className="mt-3 mb-4">Edit Reservation</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={submitHandler}>
          <label htmlFor="first_name">First name:</label>

          <input
            id="first_name"
            type="text"
            name="first_name"
            className="form-control"
            onChange={changeHandler}
            value={formData.first_name}
            required={true}
          />

          <label htmlFor="last_name" className=" mt-1">
            Last name:
          </label>

          <input
            id="last_name"
            type="text"
            name="last_name"
            className="form-control"
            onChange={changeHandler}
            value={formData.last_name}
            required={true}
          />

          <label htmlFor="mobile_number" className=" mt-1">
            Mobile number:
          </label>

          <input
            id="mobile_number"
            type="text"
            name="mobile_number"
            className="form-control"
            onChange={changeHandler}
            value={formData.mobile_number}
            required={true}
          />

          <label htmlFor="reservation_date" className=" mt-1">
            Reservation date:
          </label>

          <input
            id="reservation_date"
            type="date"
            name="reservation_date"
            className="form-control"
            onChange={changeHandler}
            value={formData.reservation_date}
            required={true}
          />

          <label htmlFor="reservation_time" className=" mt-1">
            Reservation time:
          </label>

          <input
            id="reservation_time"
            type="time"
            name="reservation_time"
            className="form-control"
            onChange={changeHandler}
            value={formData.reservation_time}
            required={true}
          />
          <label htmlFor="people" className=" mt-1">
            Number of guests:{" "}
          </label>
          <input
            id="people"
            type="number"
            name="people"
            className="form-control"
            onChange={changeHandler}
            required={true}
            min="1"
            value={formData.people}
          />
          <div className="mb-5">
            <br />
            <button type="submit" className="btn btn-primary mr-3">
              Submit
            </button>

            <button
              type="button"
              value="Cancel"
              className="btn btn-danger mr-5"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>

          <ErrorAlert error={reservationsError} />
        </form>
      </div>
    </>
  );
}

export default EditReservation;
