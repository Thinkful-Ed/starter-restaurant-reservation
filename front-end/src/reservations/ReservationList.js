import React from "react";

function ReservationList({ reservations, loadDashboard }) {
  const reservationsMap = reservations.map((reservation) => (
        <tr key={reservation.reservation_id}>
          <td>{reservation.first_name} {reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          </tr>
  ));

  return (
    <div className="table-hover">
    <table className="table text-center table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Time</th>
          <th scope="col">Party Size</th>
        </tr>
      </thead>

      <tbody className="table-group-divider">{reservationsMap}</tbody>
    </table>
  </div>
    )
}

export default ReservationList;
