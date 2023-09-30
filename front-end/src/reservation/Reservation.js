import React from "react";
import {Link} from "react-router-dom";
import {cancelReservation} from "../utils/api";

export default function Reservation({reservation, setLoadTrigger}) {
  function cancelHandler(reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      cancelReservation(reservation_id, abortController.signal)
        .then(() => {
          setLoadTrigger((prev) => prev + 1);
        })
        .catch(console.log);
      return () => abortController.abort();
    }
  }

  return (
    <>
      <h2>
        {reservation.first_name}-{reservation.last_name}
      </h2>
      <p>Mobile Number: {reservation.mobile_number}</p>
      <p>Reservation Date: {reservation.reservation_date}</p>
      <p>Reservation Time: {reservation.reservation_time}</p>
      <p>People: {reservation.people}</p>
      <p data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </p>
      {reservation.status === "booked" && (
        <button>
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            Seat
          </Link>
        </button>
      )}
      <button>
        <a href={`/reservations/${reservation.reservation_id}/edit`}>Edit</a>
      </button>

      <button
        data-reservation-id-cancel={reservation.reservation_id}
        onClick={() => cancelHandler(reservation.reservation_id)}
      >
        Cancel
      </button>
    </>
  );
}
