import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setreservation] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const { reservationId } = useParams();
  const history = useHistory();

  const handleChange = (event) => {
    if (event.target.name === "people") {
      setreservation({
        ...reservation,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setreservation({
        ...reservation,
        [event.target.name]: event.target.value,
      });
    }
  };

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    createReservation({
      ...reservation,
    })
      .then(() => {
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setErrors);

      if(!errors) {
      setreservation({ ...initialFormState });
      }
        return () => abortController.abort();
  }

  return (
    <div>
      <ErrorAlert error={errors} />
      {!reservationId ? (
        <h3>Create New Reservation</h3>
      ) : (
        <h3>Edit Reservation</h3>
      )}
      <form className="form-group" name="createReservation">
        <label className="my-3" htmlFor="first name">
          First Name
        </label>
        {!reservationId ? (
          <input
            className="form-control"
            name="first_name"
            type="text"
            id="first_name"
            required={true}
            onChange={handleChange}
            placeholder="First Name"
          />
        ) : (
          <input
            className="form-control"
            name="first_name"
            type="text"
            id="first_name"
            required={true}
            onChange={handleChange}
            // value={reservationI}
          />
        )}
        <label className="my-3" htmlFor="last_name">
          Last Name
        </label>
        {!reservationId ? (
          <input
            className="form-control"
            name="last_name"
            id="last_name"
            type="text"
            required={true}
            onChange={handleChange}
            placeholder="Last Name"
            rows="1"
          />
        ) : (
          <input
            className="form-control"
            name="last_name"
            id="last_name"
            tyoe="text"
            required={true}
            onChange={handleChange}
            // value={last_name}
            rows="1"
          />
        )}

        <label className="my-3" htmlFor="mobile_number">
          Mobile Number
        </label>
        {!reservationId ? (
          <input
            className="form-control"
            name="mobile_number"
            type="text"
            maxLength="10"
            id="mobile_number"
            required={true}
            onChange={handleChange}
            placeholder="Mobile Number"
            rows="1"
          />
        ) : (
          <input
            className="form-control"
            name="mobile_number"
            type="number"
            maxLength="10"
            id="mobile_number"
            required={true}
            onChange={handleChange}
            // value={last_name}
            rows="1"
          />
        )}

        <label className="my-3" htmlFor="reservation_date">
          Reservation Date
        </label>
        {!reservationId ? (
          <input
            className="form-control"
            name="reservation_date"
            type="date"
            id="reservation_date"
            required={true}
            onChange={handleChange}
            placeholder="Reservation Date"
            rows="1"
          />
        ) : (
          <input
            className="form-control"
            name="reservation_date"
            id="reservation_date"
            type="date"
            required={true}
            onChange={handleChange}
            // value={last_name}
            rows="1"
          />
        )}

        <label className="my-3" htmlFor="reservation_time">
          Reservation Time
        </label>
        {!reservationId ? (
          <input
            className="form-control"
            name="reservation_time"
            type="time"
            id="reservation_time"
            required={true}
            onChange={handleChange}
            placeholder="Reservation Time"
            rows="1"
          />
        ) : (
          <input
            className="form-control"
            name="reservation_time"
            id="reservation_time"
            type="time"
            required={true}
            onChange={handleChange}
            // value={last_name}
            rows="1"
          />
        )}

        <label className="my-3" htmlFor="people">
          People
        </label>
        {!reservationId ? (
          <input
            className="form-control"
            name="people"
            type="number"
            id="people"
            required={true}
            onChange={handleChange}
            placeholder="Party Size"
            rows="1"
          />
        ) : (
          <input
            className="form-control"
            name="people"
            id="people"
            type="number"
            required={true}
            onChange={handleChange}
            // value={last_name}
            rows="1"
          />
        )}
        <div className="container">
          <div className="row">
            <div className="flex btn-group">
              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={history.goBack}
                >
                  Cancel
                </button>
              </div>
              <div className="my-3 px-2">
                <button
                  className="btn btn-primary"
                  onClick={submitHandler}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

//todo:
// form with the following fields:
// First name: <input name="first_name" />
// Last name: <input name="last_name" />
// Mobile number: <input name="mobile_number" />
// Date of reservation: <input name="reservation_date" />
// Time of reservation: <input name="reservation_time" />
// Number of people in the party, which must be at least 1 person. <input name="people" />
//submit button which saves the res and then displays dashboard with date of res
//cancel button that returns user to previous page
