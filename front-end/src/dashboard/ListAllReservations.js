function ListAllReservations({ reservations }) {
  const tableRows = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>
          <a href={`/reservations/${reservation.reservation_id}/seat`}>
            <button>Seat</button>
          </a>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Mobile Number</th>
          <th>Reservation Date</th>
          <th>Reservation Time</th>
          <th>Party Size</th>
          <th>Seat</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default ListAllReservations;
