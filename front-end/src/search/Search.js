import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { findNumber } from "../utils/api";

import InputForm from "../form/InputForm";
import ReservationsTable from "../dashboard/ReservationsTable";

function Search() {
  const history = useHistory();
  const [reservationsList, setReservationsList] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const { search } = useLocation();
  const mobile_number = new URLSearchParams(search).get("mobile_number");

  useEffect(() => {
    async function loadReservations() {
      if (mobile_number) {
        const abortController = new AbortController();
        setReservationsError(null);
        try {
          const data = await findNumber(mobile_number, abortController.signal);
          if (!data.length)
            setReservationsError(new Error("No reservations found."));
            setReservationsList(data);
        } catch (err) {
          setReservationsError(err);
        }
        return () => abortController.abort();
      } else {
        setReservationsList(null);
        setReservationsError(null);
      }
    }
    loadReservations();
  }, [mobile_number]);

  let initialFormState = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    history.push(`/search?mobile_number=${formData.mobile_number}`);
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
            {reservationsList && (
              <ReservationsTable
                reservations={reservationsList}
                error={reservationsError}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
