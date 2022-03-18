import React from "react";
import { useHistory } from "react-router-dom";
import { updateReservation } from "../../utils/api";
// import { updateReservation } from "../utils/api";
function ReservationsTable({ reservations }) {
  const history = useHistory();

  const handleCancel = (reservation) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const AC = new AbortController();
      updateReservation(
        { ...reservation, status: "cancelled" },
        true,
        AC.signal
      ).then(history.push("/"));
      return () => AC.abort();
    }
  };
  const reservationsRows = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <th>
          {reservation.last_name}, {reservation.first_name}
        </th>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <th data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </th>
        {reservation.status === "booked" ? (
          <td style={{ display: "flex" }}>
            <div className="btn-group" role="group" aria-label="date_selection">
              <button type="button" className="btn btn-success">
                <a
                  href={`/reservations/${reservation.reservation_id}/seat`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Seat
                </a>
              </button>

              <button type="button" className="btn btn-primary">
              <a
                href={`/reservations/${reservation.reservation_id}/edit`}
                style={{ textDecoration: "none", color: "white" }}
              >
                  Edit{" "}
              </a>
                </button>

              <button
                type="button"
                className="btn btn-danger"
                data-reservation-id-cancel={reservation.reservation_id}
                onClick={() => handleCancel(reservation)}
              >
                Cancel
              </button>
            </div>
          </td>
        ) : (
          <td>N/A</td>
        )}
      </tr>
    );
  });
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">People</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{reservationsRows}</tbody>
    </table>
  );
}

export default ReservationsTable;