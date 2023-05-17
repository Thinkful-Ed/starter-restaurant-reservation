import React, { useState } from "react";
import { listReservations, updateStatus } from "../utils/api";
import ReservationsList from "../reservation/ReservationsList";

export const Search = () => {
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const filterResults = false;

  const changeHandler = (event) => {
    setMobileNumber(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    let res = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    await setReservations(res);
    setSubmitted(true);

    return () => abortController.abort();
  };

  const cancelHandler = async (event) => {
    const abortController = new AbortController();

    const result = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );

    if (result) {
      await updateStatus(event.target.value, "cancelled");
      let res = await listReservations(
        { mobile_number: mobileNumber },
        abortController.signal
      );
      await setReservations(res);
      setSubmitted(true);
    }

    return () => abortController.abort();
  };

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
      {submitted ? (
        <ReservationsList
          reservations={reservations}
          filterResults={filterResults}
          cancelHandler={cancelHandler}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default Search;