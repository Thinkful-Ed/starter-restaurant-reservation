import React from "react";
import { Link } from "react-router-dom"

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
        {reservation.status === "booked" ? <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          <button
          href={`/reservations/${reservation.reservation_id}/seat`}
          value={`${reservation.reservation_id}`}
          >
            Seat
          </button>
        </Link> : <></>}
      </td>
    </tr>
  );
}

export default ReservationCard;
