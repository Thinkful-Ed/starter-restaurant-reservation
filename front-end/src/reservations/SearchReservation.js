import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationList from "./ReservationList";

function SearchReservation(){
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
  
    /**
     * updates the state of mobileNumber when the user makes any changes to it
     */
    function handleChange({ target }) {
      setMobileNumber(target.value);
    }
  
    /** makes a get request to list all reservations under the given mobileNumber when the "submit" button is clicked */
    function handleSubmit(event) {
      event.preventDefault();
      const abortController = new AbortController();
      setError(null);
  
      listReservations({ mobile_number: mobileNumber }, abortController.signal)
        .then(setReservations)
        .catch(setError);
  
      return () => abortController.abort();
    }
  
    /** returns all reservation(s), if any */
    const searchResultsJSX = () => {
      return reservations.length > 0 ? (
        reservations.map((reservation) => (
          <ReservationList reservations={reservations}/>
        ))
      ) : (
        <tr>
          <td>No reservations found</td>
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
            Enter a customer's phone number:
          </label>
          <input
          className="mx-2"
            name="mobile_number"
            id="mobile_number"
            type="tel"
            onChange={handleChange}
            value={FormData.mobile_number}
            required
          />
          <button
            className="btn btn-primary m-1"
            type="submit"
            onClick={handleSubmit}
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
          <tbody>{searchResultsJSX()}</tbody>
        </table>
      </div>
      </>
    )
}
export default SearchReservation;