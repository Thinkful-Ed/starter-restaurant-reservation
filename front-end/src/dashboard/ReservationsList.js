import React from "react";
import { Link } from "react-router-dom";

function ReservationsList({ reservation, date }) {
  //If the reservations date is todays date, return the reservation info.
  if (reservation.reservation_date === date) {
    return (
      <tr>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button>Seat</button>
          </Link>
        </td>
      </tr>
    );
  } else {
    return <></>;
  }
}

export default ReservationsList;
