import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ResTable from "../dashboard/ReservationDash/ResTable";

export default function Search() {
    const [reservations, setReservations] = useState([]);
    const [display, setDisplay] = useState(false);
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState(null);
  
    function changeHandler(event) {
      setMobile(event.target.value);
    }
  
    async function searchHandler(event) {
      event.preventDefault();
      const abortController = new AbortController();
      try {
        const reservations = await listReservations(
          { mobile_number: mobile },
          abortController.signal
        );
        setReservations(reservations);
        setDisplay(true);
      } catch (error) {
        setError(error);
      }
      return () => abortController.abort();
    }
  
    return (
      <>
      <div className="d-flex justify-content-center mt-4">
          <h3>Reservation Lookup</h3>
          </div>
        <ErrorAlert error={error} />
          <form className="form-inline d-flex justify-content-center mt-5" onSubmit={searchHandler}>
            <input
              type="search"
              name="mobile_number"
              id="mobile_number"
              onChange={changeHandler}
              placeholder="Enter a customer's phone number"
              value={mobile}
              className="form-control bg-secondary bg-opacity-10"
              required
            />
              <button type="submit" className="btn btn-outline-primary ml-2">
              <i className="fas fa-search"></i>
              <span className="oi oi-magnifying-glass"/>
              Search
              </button>
          </form>
        {display && (
          <div className="d-flex justify-content-center mt-5">
            {reservations.length ? (
              <ResTable
                reservations={reservations}
                setReservations={setReservations}
                setError={setError}
              />
            ) : (
              <h3>No reservations found</h3>
            )}
          </div>
        )}
      </>
    );
  }
