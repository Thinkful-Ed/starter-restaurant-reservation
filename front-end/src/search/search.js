import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationsTable from "../dashboard/ReservationsTable";

export default function Search() {
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    setError(null);
    try {
      const response = await listReservations({ mobile_number }, ac.signal);
      setReservations(response);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <h1>Search Reservations</h1>
      <form className="form-group mb-3" onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">Mobile Number:</label>
        <div style={{ display: "flex" }}>
          <input
            name="mobile_number"
            className="form-control"
            type="search"
            placeholder="Enter a customer's phone number"
            onChange={(event) => setMobile_number(event.target.value)}
            value={mobile_number}
          />
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </div>
      </form>
      <br />
      <div>
        {reservations && reservations.length ? reservations.map((reservation) => (
          <div>
           <ReservationsTable reservations={reservations} />
           </div>
        )) : (<p>No reservations found</p>)}
      </div>
    </div>
  );
}