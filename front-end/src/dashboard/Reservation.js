import React from "react";

function Reservation({ reservations = [] }) {
  const rows = reservations.length ? (
    reservations.map((reservation) => {
      return (
        <tr key={reservation.reservation_id}>
          <td>{reservation.reservation_id}</td>
          <td>
            {reservation.last_name}, {reservation.first_name}
          </td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
          </td>
          {/* buttons here */}
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="6">No reservations found.</td>
    </tr>
  );


  return (
    <div className="table-responsive">
      <table className="table no-wrap">
        <thead>
          <tr>
            <th className="border-top-0">#</th>
            <th className="border-top-0">NAME</th>
            <th className="border-top-0">PHONE</th>
            <th className="border-top-0">DATE</th>
            <th className="border-top-0">TIME</th>
            <th className="border-top-0">PEOPLE</th>
            <th className="border-top-0">STATUS</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
export default Reservation;
