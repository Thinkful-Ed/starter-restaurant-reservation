import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationList from "./ReservationList";

function SearchReservation({ reservation }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  function changeHandler({ target }) {
    setMobileNumber(target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);

    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  const matchingReservations = () => {
    return reservations.length > 0 ? (
      reservations.map(() => <ReservationList reservations={reservations} />)
    ) : (
      <p>
        <span className="oi oi-warning"></span> No reservations found
      </p>
    );
  };

  return (
    <>
      <div>
        <h1 className="mt-3 mb-4">Search for a Reservation</h1>
        <ErrorAlert error={error} />
        <div>
          <form>
            <div className="row g-3">
              <div className="col-sm-3">
                <label htmlFor="mobile_number">
                  Enter customer's phone number:
                </label>
                <input
                  className="form-control"
                  name="mobile_number"
                  id="mobile_number"
                  type="tel"
                  onChange={changeHandler}
                  value={FormData.mobile_number}
                  required={true}
                />
              </div>
            </div>
            <button
              className="btn btn-primary mt-2 mb-5"
              type="submit"
              onClick={submitHandler}
            >
              Find
            </button>
          </form>
        </div>
      </div>
      {matchingReservations()}
    </>
  );
}
export default SearchReservation;
