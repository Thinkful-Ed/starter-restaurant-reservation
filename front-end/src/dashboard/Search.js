import React from "react";
import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import { searchReservationsByPhoneNumber } from "../utils/api";

const INITIAL_FORM_DATA = {
  mobile_number: "",
};

function Search() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const result = await searchReservationsByPhoneNumber(
        formData.mobile_number,
        abortController.signal,
      );
      console.log("RESULT------", result);
      setReservations(result);
    } catch (error) {
      setError(error);
    }
  }

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  return (
    <div>
      <h1>Search by phone number</h1>
      <form onSubmit={onSubmit}>
        <ErrorAlert error={error} />

        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          name="mobile_number"
          id="mobile_number"
          placeholder="Enter a customer's phone number"
          required
          value={formData.mobile_number}
          onChange={handleChange}
        ></input>

        <button className="btn btn-primary w-100" type="submit">
          Find
        </button>
      </form>
      {reservations !== null && reservations.length === 0 && (
        <div>No reservations found</div>
      )}
      {reservations !== null && reservations.length > 0 && (
        <ReservationsList reservations={reservations} />
      )}
    </div>
  );
}

export default Search;
