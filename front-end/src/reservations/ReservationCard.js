import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

function ReservationCard({ reservation, loadReservations, setError, index }) {

  const handleCancelReservation = async (event) => {
    event.preventDefault()
    try {
      const abortController = new AbortController();
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        await updateReservationStatus(
          "cancelled",
          reservation.reservation_id,
          abortController.signal
        );
        loadReservations()
        return () => abortController.abort()
      }
      
    } catch (error) {
      setError(error);
    }
  };
  return (
    <tr key={index}>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.people}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
        {reservation.status === "booked" ? (
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button
              href={`/reservations/${reservation.reservation_id}/seat`}
              value={`${reservation.reservation_id}`}
            >
              Seat
            </button>
          </Link>
        ) : (
          <></>
        )}
      </td>
      <td>
        {reservation.status !== "finished" &&
        reservation.status !== "cancelled" ? (
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button
              href={`/reservations/${reservation.reservation_id}/edit`}
              value={`${reservation.reservation_id}`}
            >
              Edit
            </button>
          </Link>
        ) : (
          <></>
        )}
      </td>
      {reservation.status !== "finished" &&
      reservation.status !== "cancelled" ? (
        <td>
          <button data-reservation-id-cancel={`${reservation.reservation_id}`} onClick={handleCancelReservation}>Cancel</button>
        </td>
      ) : (
        <></>
      )}
    </tr>
  );
}

export default ReservationCard;
