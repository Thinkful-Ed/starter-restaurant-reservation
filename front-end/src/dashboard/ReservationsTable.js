import { useHistory } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import { cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationsTable({ reservations, error }) {
  const history = useHistory();

  async function handleCancel(reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await cancelReservation(reservation_id);
      history.go(0);
    }
  }

  let reservationsList = (
    <tr>
      <td colSpan={6}>No reservations found.</td>
    </tr>
  );
  if (reservations.length)
    reservationsList = formatReservationDate(
      formatReservationTime(reservations)
    ).map(
      (
        {
          reservation_id,
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time,
          people,
          status,
        },
        index
      ) => (
        <tr key={index}>
          <td>{reservation_id}</td>
          <td>
            {first_name} {last_name}
          </td>
          <td>{mobile_number}</td>
          <td>{reservation_date}</td>
          <td>{reservation_time}</td>
          <td>{people}</td>
          <td data-reservation-id-status={reservation_id}>{status}</td>
          <td>
            {status === "booked" && (
              <a
                href={`/reservations/${reservation_id}/edit`}
                className="btn btn-primary mr-2"
              >
                Edit
              </a>
            )}
          </td>
          <td>
            {status === "booked" && (
              <a
                href={`/reservations/${reservation_id}/seat`}
                className="btn btn-primary mr-2"
              >
                Seat
              </a>
            )}
          </td>
          <td>
            <button
              data-reservation-id-cancel={reservation_id}
              className="btn btn-secondary"
              onClick={() => handleCancel(reservation_id)}
            >
              Cancel
            </button>
          </td>
        </tr>
      )
    );

  return (
    <div>
      <ErrorAlert error={error} />
      {!error && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>People</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{reservationsList}</tbody>
        </table>
      )}
    </div>
  );
}
