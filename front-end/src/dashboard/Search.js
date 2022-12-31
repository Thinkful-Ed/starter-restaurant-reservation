import React from "react";
import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchReservationsByPhoneNumber } from "../utils/api";

const INITIAL_FORM_DATA = {
  mobile_number: "",
};

function Search() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const result = await searchReservationsByPhoneNumber(
        formData.mobile_number,
        abortController.signal
      );
      console.log("RESULT------", result);
    } catch (error) {
      setError(error);
    }
  }

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <ErrorAlert error={error} />
      <label htmlFor="mobile_number">Mobile Number</label>
      <input
        name="mobile_number"
        id="mobile_number"
        value={formData.mobile_number}
        onChange={handleChange}></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Search;
