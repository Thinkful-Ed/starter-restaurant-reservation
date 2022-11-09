import React, { useState } from "react";
import { cancelReservation } from "../../utils/api";

function TableRow({ reservation, loadDashboard }) {
  const [cancelError, setCancelError] = useState(null);
  const {
    reservation_id,
    last_name,
    first_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;

  function handleCancelClick(reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setCancelError(null);
      const status = {
        status: "cancelled",
      };
      cancelReservation(reservation_id, status, abortController.signal)
        .then(() => {
          loadDashboard();
        })
        .catch(cancelError);
      return () => abortController.abort;
    }
  }

  return (
    <tr key={reservation_id}>
      <td>{reservation_id}</td>
      <td>
        {last_name}, {first_name}
      </td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td data-reservation-id-status={reservation_id}>{status}</td>
      <td>
        {status === "booked" ? (
          <a
            style={{ backgroundColor: "#7B6A96", color: "white" }}
            className="btn btn-seat"
            role="button"
            href={`/reservations/${reservation_id}/seat`}
          >
            Seat
          </a>
        ) : null}
      </td>
      <td>
        {status === "booked" ? (
          <a
            style={{ backgroundColor: "#7B6A96", color: "white" }}
            className="btn btn-edit"
            role="button"
            href={`/reservations/${reservation_id}/edit`}
          >
            Edit
          </a>
        ) : null}
      </td>
      <td>
        {status === "booked" ? (
          <button
            data-reservation-id-cancel={reservation.reservation_id}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleCancelClick(reservation_id)}
          >
            Cancel
          </button>
        ) : null}
      </td>
    </tr>
  );
}

export default TableRow;
