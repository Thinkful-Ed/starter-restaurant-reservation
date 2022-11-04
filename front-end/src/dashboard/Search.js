import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import TableHeader from "./TableHeader";
import ReservationCard from "../reservations/ReservationCard";
function Search() {
  const initFormData = {
    mobile_number: "",
  };
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initFormData);
  const [clicked, setClicked] = useState(false);
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };

  useEffect(loadSearch, []);

  async function loadSearch() {
    try {
      const abortController = new AbortController();
      setReservations(
        await listReservations(initFormData, abortController.signal)
      );
    } catch (error) {}
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const abortController = new AbortController();
      setClicked(true);
      const reservationsByNumber = await listReservations(
        formData,
        abortController.signal
      );
      setReservations(reservationsByNumber);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />

      <div>
        <form onSubmit={submitHandler}>
          <input
            name="mobile_number"
            value={formData.mobile_number}
            onChange={changeHandler}
            placeholder="Enter a customer's phone number"
            required={true}
          ></input>
          <button type="submit">Find</button>
        </form>
      </div>
      {clicked && reservations.length <= 0 ? (
        <div>No reservations found</div>
      ) : (
        <></>
      )}
      {reservations.length >= 1 ? (
        <div>
          <table>
            <TableHeader
              headers={[
                "id",
                "first name",
                "last name",
                "phone number",
                "date",
                "time",
                "party size",
                "status",
              ]}
            />
            {reservations.map((reservation)=> <ReservationCard reservation={reservation}/>)}
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Search;
