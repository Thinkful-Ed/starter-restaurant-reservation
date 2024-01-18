import React from "react";

function ReservationList({ reservations, loadDashboard, date }) {
  let reservationsMap;
  if (reservations.length === 0) {
    reservationsMap = (
      <tr>
        <td colSpan="5">There are no reservations for this day.</td>
      </tr>
    );
  } else {
    reservationsMap = reservations.map((reservation) => (
      <tr 
      key={reservation.reservation_id}>
        <td className="align-middle">
          {reservation.first_name} {reservation.last_name}
        </td>
        <td className="align-middle">{reservation.mobile_number}</td>
        <td className="align-middle">{reservation.reservation_date}</td>
        <td className="align-middle">{reservation.reservation_time}</td>
        <td className="align-middle">{reservation.people}</td>
        <td className="align-middle">
          <a 
          href={`/reservations/${reservation.reservation_id}/seat`}
          type="button"
          className="btn btn-outline-info">
            Seat
          </a>
        </td>
      </tr>
    ));
  }

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
            <th scope="col">Seat</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">{reservationsMap}</tbody>
      </table>
    </div>
  );
}

export default ReservationList;
