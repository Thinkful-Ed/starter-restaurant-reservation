import React from "react";

export default function ReservationRow({
  reservation_id,
  first_name,
  last_name,
  mobile_number,
  people,
  reservation_time,
  reservation,
}) {
  return (
    <tr>
      <th scope="row">{reservation_id}</th>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{people}</td>
      <td>{reservation_time}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
        {reservation.status === "booked" ? (
          <a
            className="btn btn-secondary"
            role="button"
            href={`/reservations/${reservation_id}/seat`}
          >
            Seat
          </a>
        ) : null}
      </td>
    </tr>
  );
}
