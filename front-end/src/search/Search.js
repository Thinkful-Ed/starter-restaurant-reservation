import React, { useEffect, useState } from "react";
import { findNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import InputForm from "../form/InputForm";
import ReservationsTable from "../dashboard/ReservationsTable";

function Search() {
  const [reservations, setReservations] = useState(null);
  const [reservationsList, setReservationsList] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadReservations, [reservations]);

  function loadReservations() {
    if (reservations && reservations.length === 0) {
      setReservationsError({ message: "No reservations found" });
      setReservationsList(null);
    } else if (reservations) {
      setReservationsError(null);
      setReservationsList(
        reservations.map((res, index) => (
          <li key={index}>
            <ReservationsTable reservation={res} />
          </li>
        ))
      );
    }
  }

  let initialFormState = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await findNumber(formData);
      setReservations(data);
    } catch (err) {
      setReservationsError(err);
    }
  }

  return (
    <>
      <div className="d-flex flex-column">
        <h2>Search</h2>
        <form className="d-flex flex-column h5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mobile_number">Mobile Number</label>
            <InputForm
              type="text"
              id="mobile_number"
              name="mobile_number"
              placeholder="Enter a customer's phone number"
              formData={formData}
              handleChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary mr-2" type="submit">
              Find
            </button>
          </div>
          <div>
            <ErrorAlert error={reservationsError} />
            <ul>{reservationsList && reservationsList}</ul>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
