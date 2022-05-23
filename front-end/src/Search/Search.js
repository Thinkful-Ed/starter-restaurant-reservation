import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import CancelButton from "../Buttons/CancelButton";
import EditButton from "../Buttons/EditButton";

function Search() {
  const [number, setNumber] = useState({ mobile_number: "" });
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  function changeHandle(event) {
    setNumber({ ...number, mobile_number: event.target.value });
  }

  async function submitHandle(event) {
    event.preventDefault();
    setError(null);
    try {
      const data = await listReservations({
        mobile_number: number.mobile_number,
      });
      if (data.length === 0) {
        throw new Error("No reservations found");
      }
      if (data.error) {
        throw data.error;
      }

      setReservations(data);
    } catch (err) {
      setError(err);
    }
  }

  const formatedReservations = reservations.map((reservation) => {
    return (
      <div key={reservation.reservation_id} className="border border-dark w-50 m-4 mx-auto rounded-lg">
        <div className="bg-secondary text-white p-2">
          <h5>{reservation.first_name}</h5>
        </div>
        <div className="border-bottom border-dark p-2">
          <h5>Status : {reservation.status}</h5>
        </div>
        <div className="p-2 btn group">
          <EditButton reservation={reservation} />
          <CancelButton reservation={reservation} setError={setError} />
        </div>
      </div>
    );
  });

  return (
    <div className="text-center">
      <ErrorAlert error={error} />
      <form
        onSubmit={submitHandle}
        className="d-flex flex-column col-6 text-center mx-auto font-weight-bolder mb-4"
      >
        <h2>Search Mobile Number</h2>
        <input
          type="text"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={changeHandle}
          value={number?.mobile_number}
          className="text-center"
        />
        <button type="submit" className="btn btn-info">
          find
        </button>
      </form>
      {formatedReservations}
    </div>
  );
}

export default Search;
