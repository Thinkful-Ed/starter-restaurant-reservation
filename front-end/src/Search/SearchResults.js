function SearchResults({ reservations }) {
  let row = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>{reservation.status}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="searchList table">
        <thead>
          <tr>
            <th className="border-top-0">Mobile Number</th>
            <th className="border-top-0">First Name</th>
            <th className="border-top-0">Last Name</th>
            <th className="border-top-0">Reservation Date</th>
            <th className="border-top-0">Reservation Time</th>
            <th className="border-top-0">People</th>
            <th className="border-top-0">Status</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
    </div>
  );
}

export default SearchResults;
