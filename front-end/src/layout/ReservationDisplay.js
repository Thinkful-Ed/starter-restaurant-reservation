import React from "react";

export default function ReservationDisplay(reservation, {seatHandler}) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation.reservation;
  return (
    <tr>
      <th scope="row">{reservation_id}</th>
      <td>
        {first_name} {last_name}
      </td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <button type="button" class="btn btn-info my-2" onClick={seatHandler}>
        Seat
      </button>
    </tr>
  );
}
