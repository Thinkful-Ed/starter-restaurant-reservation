import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

function Search() {
  const [number, setNumber] = useState({ mobile_number: "" });
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  function changeHandle(event) {
    setNumber({ ...number, mobile_number: event.target.value });
  }

  async function submitHandle(event) {
    event.preventDefault();
    try {
      const data = await listReservations({
        mobile_number: number.mobile_number,
      });
      if (data.length === 0) {
        throw new Error("No reservations found");
      }
      if (data.error) {
        throw data.error;
      }

      setReservations(data);
    } catch (err) {
      setError(err);
    }
  }

  const formatedReservations = reservations.map((reservation) => {
    return <h5>{reservation.first_name}</h5>;
  });

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandle}>
        <input
          type="text"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={changeHandle}
        />
        <button type="submit">find</button>
      </form>
      {formatedReservations}
    </div>
  );
}

export default Search;
