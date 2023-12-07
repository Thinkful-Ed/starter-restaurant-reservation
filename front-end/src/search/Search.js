import React, { useState } from "react";
import { listReservationsByMobileNumber } from "../utils/api";
import ReservationView from "../dashboard/ReservationView";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservationsError, setReservationsError] = useState(null);
    const [reservations, setReservations] = useState([]);
  
    const handleInputChange = (event) => {
      setMobileNumber(event.target.value);
    };
  
    const handleSearch = () => {
      // You can make an API call or perform any action with the phone number here
      const abortController = new AbortController();
      setReservationsError(null);
      setMobileNumber("");
      listReservationsByMobileNumber(mobileNumber)
      .then(setReservations)
      .catch(setReservationsError);
      console.log(reservations);
    return () => abortController.abort();
    };
  
    return (
      <div>
        <input
          type="text"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          value={mobileNumber}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSearch}>Find</button>

        {reservations && reservations.length > 0 && reservations.map((reservation) => 
        <ReservationView key={reservation.reservation_id} reservation={reservation} />
        )}

        {(reservations && reservations.length === 0) && <p>
            No reservations found</p>}

        <ErrorAlert error={reservationsError} />
      </div>
    );
  }
  
  export default Search;