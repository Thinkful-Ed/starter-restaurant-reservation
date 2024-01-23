import React from "react";
import { Link } from "react-router-dom";

function ReservationsList({ reservation, date }) {
  //If there are reservations on the passed in date, lists those
  if (reservation.reservation_date === date) {
    return (
      <tr>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          {reservation.status === "booked" ? (
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button>Seat</button>
            </Link>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  } else {
    return <></>;
  }
}

export default ReservationsList;
