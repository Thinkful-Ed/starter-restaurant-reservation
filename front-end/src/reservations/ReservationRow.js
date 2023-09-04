import React from "react";
import { Link } from "react-router-dom";
import { updateReservation } from "../utils/api";

export default function ReservationRow({ reservation, loadDashboard }) {
  if (!reservation || reservation.status === "finished") return null;

  /**
   * Allows the user to cancel a reservation.
   */
  async function handleCancel() {
    if (
      window.confirm(
        "Do you want to cancel this reservation?"
      )
    ) {
      const abortController = new AbortController();

     await updateReservation(reservation.reservation_id, "cancelled", abortController.status)
     
     await loadDashboard();
      return () => abortController.abort();
    }
  }

  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date.substr(0, 10)}</td>
      <td>{reservation.reservation_time.substr(0, 5)}</td>
      <td>{reservation.people}</td>
      <td>{reservation.status}</td>


      {reservation.status === "booked" ? (
        <>
          <td>
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button type="button">Edit</button>
            </Link>
          </td>

          <td>
            <button
              type="button"
              onClick={handleCancel}
              data-reservation-id-cancel={reservation.reservation_id}
            >
              Cancel
            </button>
          </td>

          <td>
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              <button type="button">Seat</button>
            </a>
          </td>
        </>
      ) : (
        <>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </>
      )}
    </tr>
  );
}