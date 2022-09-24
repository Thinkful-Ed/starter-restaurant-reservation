import React from "react";
import { Link } from "react-router-dom";

export default function ReservationCard({ reservation, loadReservations }) {
  return (
    <tr>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      {reservation.status === "booked" && (
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          <button className="btn btn-success">Seat</button>
        </Link>
      )}
    </tr>
  );
}
