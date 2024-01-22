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
    <div>
      <h1 className="p-4 m-4 text-center">Find a Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="row p-4 m-4 w-75 mx-auto border border-secondary-subtle bg-light">
          <input
            className="form-control mb-3"
            name="mobile_number"
            type="text"
            maxLength="10"
            placeholder="Enter a customer's phone number"
            aria-label="Enter a custoner's phone number"
            onChange={handleChange}
            value={reservations.mobile_number}
          />
          <div className="mx-auto">
            <button type="submit" className="btn btn-secondary">
              Find
            </button>
          </div>
        </div>
      </form>
      <ErrorAlert error={searchError} />
      <div>
        {searchPerformed && (
        <div>
            {reservations.length > 0 ? (
          <ReservationList reservations={reservations} />
        ) : (
          <p className="text-center">No reservations found</p>
        )}
            </div>
            )}
      </div>
    </div>
  );
}

export default SearchReservation;
