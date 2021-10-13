
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
      status
    }) => (
        <tbody key={reservation_id}>
          <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date.substr(0, 10)}</td>
            <td>{reservation_time.substr(0, 5)}</td>
            <td>{people}</td>
            <td>{status}</td>
            <td><a href={`/reservations/${reservation_id}/seat`} className="btn btn-success">
          Seat
        </a></td>
          </tr>
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
          <tr><td><span className="oi oi-warning"></span> There are no reservations for this date. </td></tr>
          </tbody>
        )}
      </table>
      </div>
    </>
  );
}

export default ReservationList;
