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
    <div className="container-fluid d-flex flex-column w-75 align-items-center">
      <h1 className="p-4 m-2 text-center fs-1 fw-bold">Find a Reservation</h1>
      <div className="d-flex row justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 m-4 rounded-4 bg-transparent"
        >
          <div className="row justify-content-center">
            <div className="col-sm-10 pb-2">
              <input
                className="form-control"
                name="mobile_number"
                type="text"
                maxLength="10"
                minlength="10"
                placeholder="Enter a customer's phone number"
                aria-label="Enter a customer's phone number"
                required
                onChange={handleChange}
                value={number}
              />
            </div>
            <div className="col-sm-2 d-grid d-md-block">
              <button type="submit" className="btn btn-outline-info">
                Find
              </button>
            </div>
          </div>
        </form>
      </div>
      <ErrorAlert error={searchError} />
      {searchPerformed && (
        <div>
          {reservations.length > 0 ? (
            <ReservationList
              reservations={reservations}
              showAddNewReservation={false}
            />
          ) : (
            <>
              <p className="text-center">No reservations found</p>
              <div
                className="card new-res-card m-2 rounded-4 dotted-border bg-transparent mx-auto"
                style={{ width: "18rem" }}
              >
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-2">
                    <a
                      href="/reservations/new"
                      type="button"
                      className="btn add-new-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        fill="currentColor"
                        className="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.5.5 0 0 0-.5.5v3H4a.5.5 0 0 0 0 1h3.5v3a.5.5 0 0 0 1 0v-3H12a.5.5 0 0 0 0-1H8.5v-3A.5.5 0 0 0 8 4z" />
                      </svg>
                    </a>
                  </div>
                  <p className="card-text text-center">Add a New Reservation</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchReservation;
