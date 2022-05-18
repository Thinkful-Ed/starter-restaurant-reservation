import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservation, listReservations } from "../utils/api";
import EditButton from "../utils/EditButton";

function Search() {
  const [number, setNumber] = useState({ mobile_number: "" });
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  function changeHandle(event) {
    setNumber({ ...number, mobile_number: event.target.value });
  }

  async function submitHandle(event) {
    event.preventDefault();
    setError(null)
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

  /*function EditButton({ reservation }) {
    if (reservation.status === "booked") {
      return (
        <a href={`/reservations/${reservation.reservation_id}/edit`}>
          <button>Edit</button>
        </a>
      );
    }
    else {
      return null
    }
  }*/

  async function cancelHandle(reservationId) {
    const confirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirm) {
      try {
        await cancelReservation(reservationId);
        history.go(0);
      } catch (err) {
        setError(err.message);
      }
    }
  }

  const formatedReservations = reservations.map((reservation) => {
    return (
      <div>
        <h5>{reservation.first_name}</h5>
        <h5>{reservation.status}</h5>
        <EditButton reservation={reservation} />
        <button
          onClick={() => cancelHandle(reservation.reservation_id)}
          data-reservation-id-cancel={reservation.reservation_id}
        >
          Cancel
        </button>
      </div>
    );
  });

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandle}>
        <input
          type="text"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={changeHandle}
          value={number?.mobile_number}
        />
        <button type="submit">find</button>
      </form>
      {formatedReservations}
    </div>
  );
}

export default Search;
