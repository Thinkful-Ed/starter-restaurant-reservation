import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationCard from "../reservations/ReservationCard";
import "./search.css"
function Search() {
  const initFormData = {
    mobile_number: "",
  };
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initFormData);
  const [clicked, setClicked] = useState(false);
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };

  useEffect(loadSearch, []);

  function loadSearch() {
    const abortController = new AbortController();
    setError(null);
    async function loadReservations() {
      try {
        setReservations(
          await listReservations(
            { mobile_number: formData.mobile_number },
            abortController.signal
          )
        );
      } catch (error) {
        setError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const abortController = new AbortController();
      setClicked(true);
      const reservationsByNumber = await listReservations(
        { mobile_number: formData.mobile_number },
        abortController.signal
      );
      setReservations(reservationsByNumber);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />

      <div className="search-container">
        <form onSubmit={submitHandler}>
          <input
            name="mobile_number"
            value={formData.mobile_number}
            onChange={changeHandler}
            placeholder="Enter a customer's phone number"
            required={true}
            className="search-input"
          ></input>
          <button className="search-button" type="submit">Find</button>
        </form>
      </div>
      {clicked && reservations.length <= 0 ? (
        <div>No reservations found</div>
      ) : (
        <></>
      )}
      <div className="reservations-container">
      {reservations.length >= 1 ? (
        <div>
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.reservation_id}
              setError={setError}
              index={reservation.reservation_id}
              loadReservations={loadSearch}
              reservation={reservation}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
}

export default Search;
