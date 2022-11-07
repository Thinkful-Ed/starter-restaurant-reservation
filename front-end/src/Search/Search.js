import React from "react";
import { useState } from "react";
import { listReservations } from "../utils/api";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  //have an initial form state before filling in the information
  const initialFormState = {
    mobile_number: "",
  };

  //have a state that can hold information from form
  const [searchFormData, setSearchFormData] = useState({ ...initialFormState });
  const [reservations, setReservations] = useState([]);
  const [searchError, setSearchError] = useState(null);

  //handle change of info in form
  const handleChange = ({ target }) => {
    setSearchFormData({
      ...searchFormData,
      [target.name]: target.value,
    });
    console.log(searchFormData);
  };

  const searchFormHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setSearchError(null);
    const phoneNumber = {
      mobile_number: searchFormData.mobile_number,
    };
    console.log("line 35 phoneNumber", phoneNumber);
    listReservations(phoneNumber, abortController.signal)
      .then(setReservations, console.log(reservations))
      .catch(setSearchError);
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <SearchForm
        mobile_number={searchFormData.mobile_number}
        handleChange={handleChange}
        searchFormHandler={searchFormHandler}
      />
      {reservations.length === 0 ? (
        <h4 className="no-reservations-found">No Reservations Found</h4>
      ) : (
        <SearchResults reservations={reservations} />
      )}

      <ErrorAlert error={searchError} />
    </React.Fragment>
  );
}
//make a call with listreservation from API

export default Search;
