import { updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";

function ReservationList({ reservations }) {
  const history = useHistory();

  function cancelHandler(reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      updateReservationStatus(
        reservation_id,
        "cancelled",
        abortController.status
      ).then(() => history.push("/dashboard"));

      return () => abortController.abort();
    }
  }

  const reservationsList = reservations.map(
    ({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      reservation_id,
      status,
    }) => (
      <tbody key={reservation_id}>
        {status === "finished" || status === "cancelled" ? null : (
          <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date.substr(0, 10)}</td>
            <td>{reservation_time.substr(0, 5)}</td>
            <td>{people}</td>
            <td data-reservation-id-status={reservation_id}>{status}</td>
            <td>
              {status === "seated" ? null : (
                <a
                  href={`/reservations/${reservation_id}/seat`}
                  className="btn btn-success mb-1 mr-1"
                >
                  Seat
                </a>
              )}
              <a
                href={`/reservations/${reservation_id}/edit`}
                className="btn btn-secondary mb-1"
              >
                Edit
              </a>
              <button
                data-reservation-id-cancel={reservation_id}
                type="button"
                className="btn btn-danger"
                onClick={() => cancelHandler(reservation_id)}
              >
                Cancel
              </button>
            </td>
          </tr>
        )}
      </tbody>
    )
  );

  //JSX
  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>First name</td>
              <td>Last name</td>
              <td>Phone</td>
              <td>Reservation date</td>
              <td>Reservation time</td>
              <td>Party size</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          {reservations.length > 0 ? (
            reservationsList
          ) : (
            <tbody>
              <tr>
                <td>
                  <span className="oi oi-warning"></span> There are no
                  reservations for this date.{" "}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default ReservationList;
