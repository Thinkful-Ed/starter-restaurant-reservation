import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

//This represents a row of data representing a reservation for a table
function ReservationRow({ reservation, loadDashboard }) {
  if (!reservation || reservation.status === "finished") return null;

  //Function is called if user wants to cancel a reservation
  const handleCancel = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();

      updateReservationStatus(
        reservation.reservation_id,
        "cancelled",
        abortController.status
      ).then(loadDashboard);

      return () => abortController.abort();
    }
  };

  return (
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>

      {reservation.status === "booked" && (
        <>
          <td>
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-secondary" type="button">
                Edit
              </button>
            </Link>
          </td>
          <td>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleCancel}
              data-reservation-id-cancel={reservation.reservation_id}
            >
              Cancel
            </button>
          </td>
          <td>
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary" type="button">
                Seat
              </button>
            </Link>
          </td>
        </>
      )}
    </tr>
  );
}

export default ReservationRow;
