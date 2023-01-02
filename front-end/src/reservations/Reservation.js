import React from "react";

function Reservation({reservation, handleReservationCancel}){

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
            <td data-reservation-id-status={`${reservation.reservation_id}`}>{reservation.status}</td>

            <td> 
              <a href={`/reservations/${reservation.reservation_id}/edit`} className="mt-2 mr-2">
              <button className="btn btn-secondary">Edit</button>
              </a>
              {reservation.status === "booked" ? <a href={`/reservations/${reservation.reservation_id}/seat`}  className="mt-2 mr-2">
              <button className="btn btn-info">Seat</button>
              </a>: ""}
              <button data-reservation-id-cancel={`${reservation.reservation_id}`} className="btn btn-danger" onClick={()=> handleReservationCancel(reservation.reservation_id)}>Cancel</button>
              </td>
       
        </tr>
      </>
    )
}
export default Reservation;