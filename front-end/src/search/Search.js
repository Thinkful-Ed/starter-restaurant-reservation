import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";

const Search = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  function formatPhoneNumber(value) {
    // if input value is falsy then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const handleChange = (e) => {
    setSearchNumber(formatPhoneNumber(e.target.value));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const abortController = new AbortController();
    setError(false)
    setNoResults(false);
    try {
      // check if input is valid phone number
      if (
        /[a-zA-Z.,]/.test(
          searchNumber
        ) === true
      ) {
        throw new Error("Mobile Number must only include numbers");
      }
      const data = await listReservations(
        { mobile_number: searchNumber },
        abortController.signal
      );
      setReservations(data);
      setNoResults(true);
      setSearchNumber("");
    } catch (err) {
      setError(err);
    }

    return () => abortController.abort();
  }

  return (
    <div className="text-center" onSubmit={handleSubmit}>
      <h1 className="search-header">Search by Phone Number</h1>
      <ErrorAlert error={error} />
      <form className="search-form">
        <input
          type="text"
          name="mobile_number"
          value={searchNumber}
          onChange={handleChange}
          placeholder="123-456-7890"
          required
        />
        <button className="btn-primary" type="submit">search</button>
      </form>

      {reservations.length > 0 && (
        <ReservationsList reservations={reservations} />
      )}
      {noResults && reservations.length === 0 ? (
        <h3>No reservations found</h3>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;