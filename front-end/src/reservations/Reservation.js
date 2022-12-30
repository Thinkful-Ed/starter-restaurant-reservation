import React from "react";
import {Link, useRouteMatch} from "react-router-dom";

function Reservation({reservation, handleReservationDelete}){
  const {url} = useRouteMatch();

  //format time????

    return(
        <>
       <tr key={reservation.reservation_id}>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td> 
              <Link to={`${url}/reservations/${reservation.reservation_id}/edit`} className="mt-2 mr-2">
              <button className="btn btn-secondary">Edit</button>
              </Link>
              <a role="button" className="btn btn-success" href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
              </td>
       
        </tr>
      </>
    )
}
export default Reservation;