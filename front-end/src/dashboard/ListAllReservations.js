import { useState } from "react";
import { updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * @returns {JSX.Element} a table with a list of all reservations.
 */
function ListAllReservations({ reservations }) {
  const [reservationErrors, setReservationErrors] = useState(null);

  const cancelReservationHandler = (reservation_id) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      updateReservationStatus(
        reservation_id,
        "cancelled",
        abortController.signal
      )
        .then(() => {
          window.location.reload();
        })
        .catch(setReservationErrors);

      return () => abortController.abort();
    }
  };

  const tableRows = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td data-reservation-id-status={`${reservation.reservation_id}`}>
          {reservation.status}
        </td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>
          {reservation.status === "booked" ? (
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary">Seat</button>
            </a>
          ) : (
            " "
          )}
        </td>
        <td>
          {reservation.status === "booked" ? (
            <a href={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-secondary">Edit</button>
            </a>
          ) : (
            " "
          )}
        </td>
        <td>
          {reservation.status === "booked" ? (
            <button
              className="btn btn-danger"
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={() => {
                cancelReservationHandler(reservation.reservation_id);
              }}
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  });

  if (reservations.length === 0) {
    return <p>No reservations found</p>;
  } else {
    return (
      <div>
        <ErrorAlert error={reservationErrors} />
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Status</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>Party Size</th>
              <th>Seat</th>
              <th>Edit</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}

export default ListAllReservations;
