import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../Reservations/ReservationList";

export default function SearchBox() {
  const [searchData, setSearchData] = useState({ mobile_number: "" });
  const [results, setResults] = useState(null);
  const ac = new AbortController();

  function changeMobileHandler(event) {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
  }

  function findCustomer(event) {
    event.preventDefault();

    async function requestForCustomerByMobileNumber() {
      try {
        let listOfReservations = await listReservations(searchData, ac.signal);

        setResults(listOfReservations);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    requestForCustomerByMobileNumber();
    return () => ac.abort();
  }

  return (
    <>
      <style>{"body { background-color: #f7f4f180; }"}</style>
      {results && results.length === 0 && (
        <li className="alert alert-danger m-2">No reservations found</li>
      )}
      <form onSubmit={findCustomer}>
        <label htmlFor="mobile_number">
          Search
          <input
            name="mobile_number"
            id="mobile_number"
            value={searchData.mobile_number}
            onChange={changeMobileHandler}
            type="text"
            placeholder="Enter a customer's phone number"
          />
          <button type="submit">Find</button>
        </label>
      </form>
      <ReservationList reservations={results || []} />
    </>
  );
}
