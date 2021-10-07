import { Link } from "react-router-dom";

function ReservationList({ reservations }) {
  const reservationsList = reservations.map(
    ({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      reservation_id,
    }) => (
      <table className="table" key={reservation_id}>
        <thead>
          <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date.substr(0, 10)}</td>
            <td>{reservation_time.substr(0, 5)}</td>
            <td>{people}</td>
            <td>
              <a
                href={`/reservations/${reservation_id}/seat`}
                className="btn btn-success"
              >
                Seat
              </a>
            </td>
          </tr>
        </thead>
      </table>
    )
  );

  return (
    <>
      <ul>
        {reservations.length > 0 ? (
          reservationsList
        ) : (
          <p>There are no reservations for this date.</p>
        )}
      </ul>
    </>
  );
}

export default ReservationList;
