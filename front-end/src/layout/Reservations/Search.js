import React, { useState } from "react";
import { listReservations } from "../../utils/api";
import ReservationsTable from "./ReservationsTable";

function Search() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const handleChange = (e) => {
    setNumber(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const AC = new AbortController();
    listReservations({ mobile_number: number }, AC.signal)
      .then(setReservations)
      .then(() => setNumber(""))
      .catch(console.error);
      return () => AC.abort();
  };
  return (
    <div className="col">
      <h3 style={{ textAlign: "center", margin: "50px 0 50px 0" }}>
        Search by phone number
      </h3>
      <form onSubmit={handleSearch}>
        <div
          className="m-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            id="mobile_number"
            type="text"
            value={number}
            onChange={handleChange}
            name="mobile_number"
          />
          <button type="Submit" className="btn btn-primary">
            Find
          </button>
        </div>
      </form>
      <ReservationsTable reservations={reservations} />
      {!reservations.length && <h3>No reservations found</h3>}
    </div>
  );
}

export default Search;