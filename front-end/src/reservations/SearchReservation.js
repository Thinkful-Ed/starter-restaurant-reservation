import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationList from "./ReservationList";

function SearchReservation(){
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
        reservations.map(() => (
          <ReservationList reservations={reservations}/>
        ))
      ) : (
        <tr>
          <td><span className="oi oi-warning"></span>No reservations found</td>
        </tr>
      );
    };

    return (
        <>
        <h1 className="mt-3 mb-4">Search for a Reservation</h1>
        <div>
        <form>
          <ErrorAlert error={error} />
          <label htmlFor="mobile_number">
            Enter customer's phone number:
          </label>
          <input
          className="mx-2"
            name="mobile_number"
            id="mobile_number"
            type="tel"
            onChange={changeHandler}
            value={FormData.mobile_number}
            required={true}
          />
          <button
            className="btn btn-primary m-1"
            type="submit"
            onClick={submitHandler}
          >
            Find
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
            Found reservations
            </tr>
          </thead>
          <tbody>{matchingReservations()}</tbody>
        </table>
      </div>
      </>
    )
}
export default SearchReservation;