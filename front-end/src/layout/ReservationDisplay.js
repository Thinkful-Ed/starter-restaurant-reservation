import React from "react";

export default function ReservationDisplay(reservation) {

  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation.reservation;
  if(status === "booked"){
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
      <td data-reservation-id-status={reservation_id}>{status}</td>
      <td>
      <a className="btn btn-info m-2" role="button" href={`/reservations/${reservation_id}/seat`}>
        Seat
      </a>
      </td>
    </tr>
  );
  }
  else {
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
        <td data-reservation-id-status={reservation_id}>{status}</td>
      </tr>
    );
  }
}
