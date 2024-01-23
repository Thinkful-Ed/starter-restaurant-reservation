import React, { useState } from "react";
import { searchByMobileNumber } from "../utils/api";
import ReservationList from "../reservations/ReservationList";
import ErrorAlert from "../layout/ErrorAlert";

function SearchReservation() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleChange = ({ target }) => {
    setNumber(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const searchResult = await searchByMobileNumber(number);
      setReservations(searchResult);
      setNumber("");
      setSearchPerformed(true);
    } catch (error) {
      setSearchError(error);
    }
    return () => abortController.abort();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Find a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <div className="input-group mb-3">
              <input
                className="form-control"
                name="mobile_number"
                type="text"
                maxLength="10"
                placeholder="Enter a customer's phone number"
                aria-label="Enter a customer's phone number"
                onChange={handleChange}
                value={number}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-outline-info">
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ErrorAlert error={searchError} />
      {searchPerformed && (
        <div className="mt-4">
          {reservations.length > 0 ? (
            <ReservationList reservations={reservations} />
          ) : (
            <p className="text-center">No reservations found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchReservation;
