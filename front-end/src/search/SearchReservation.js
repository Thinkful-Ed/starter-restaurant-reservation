import React, { useState } from "react";
import ListReservations from "../dashboard/ListReservations";
import { listReservations } from "../utils/api";

function SearchReservation() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    listReservations({ mobile_number: phoneNumber }).then((response) => {
      setReservations(response);
    });
  };

  return (
    <main>
      <h1>Search for a Reservation by Phone Number</h1>
      <form>
        <label>Phone Number:</label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="text"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search:
        </button>
      </form>
      {reservations && reservations.length >= 1 ? (
        <ListReservations reservations={reservations} />
      ) : (
        <div>
          <h3>No reservations found</h3>
        </div>
      )}
    </main>
  );
}

export default SearchReservation;
