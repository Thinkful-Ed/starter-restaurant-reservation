import React from "react";

function ReservationCard({ reservation, key }) {
  return (
    <tr key={key}>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.people}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
      <td>
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
        <button>Seat</button>
        </a>
      </td>
    </tr>
  );
}

export default ReservationCard;
