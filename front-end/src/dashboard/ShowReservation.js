import React from "react";
import { Link } from "react-router-dom";

function ShowReservation({ reservation, index }) {
  return (
    <tr
      //key={index.toString()}
      //className={index % 2 === 0 ? "bg-light" : "bg-primary text-white"}
    >
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td>
        <Link
          to={`/reservations/${reservation.reservation_id}/seat`}
          className="btn btn-outline-dark"
          //href={`/reservations/${reservation.reservation_id}/seat`}
          
        >
          Seat
        </Link>
      </td>
    </tr>
  );
}

export default ShowReservation;
