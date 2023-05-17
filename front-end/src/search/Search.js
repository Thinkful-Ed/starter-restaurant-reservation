import React, { useState } from "react";
import { listReservations, cancelReservation } from "../utils/api";
import Reservation from "../reservation/ReservationsList";

export const Search = () => {
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");

  const changeHandler = (event) => {
    setMobileNumber(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const formattedNumber = mobileNumber.split('-').join('');
    if(!Number(formattedNumber)){
      setReservations([])
    } else {
      listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
    }
    return () => abortController.abort();
  };

  function onCancel(reservation_id) {
    const abortController = new AbortController();
    cancelReservation(reservation_id, abortController.signal)

    return () => abortController.abort();
  }

  const reservationList = (
    <ul>
      {reservations.map((res) => (
        <li style={{ listStyleType: "none" }} key={res.reservation_id}>
          <Reservation onCancel={onCancel} reservation={res} />
        </li>
      ))}
    </ul>
  );

  return (
    <section>
      <h2>Search</h2>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              required={true}
              placeholder="Enter a customer's phone number"
              value={mobileNumber}
              maxLength="12"
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className="black">
            Find
          </button>
        </form>
      </div>
      {reservations.length > 0 ? (
        reservationList
            ) : (
        <p>There are currently no reservations for {mobileNumber}</p>
      )}
    </section>
  );
};

export default Search;