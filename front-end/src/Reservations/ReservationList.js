import React from "react";
import {Link} from "react-router-dom"
import { cancelReservation } from "../utils/api";

export default function ReservationList({reservations}){
  

  const clickHandler = async (reservation_id, status) => {
    const shouldWeCancel = window.confirm(`Do you want to cancel this reservation? This cannot be undone.`)
    if(shouldWeCancel){
      async function requestToUpdateReservationStatus(){
        await cancelReservation(reservation_id, status)
        window.location.reload()
      }
      requestToUpdateReservationStatus();

    }
  }

  return(
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {reservations.map((reservation) => {
        return (<tr key={reservation.reservation_id}>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
          <td>
            {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/seat`}><button>Seat</button></Link>}
          </td>
          <td>
            {reservation.status === "booked" && <Link to={`/reservations/${reservation.reservation_id}/edit`}><button>Edit</button></Link>}
          </td>
          <td>
            {reservation.status !== "cancelled" && <button data-reservation-id-cancel={reservation.reservation_id} onClick={()=>clickHandler(reservation.reservation_id, "cancelled")}>Cancel</button>}
          </td>
        </tr>)
      })}
        </tbody>
      </table>
    </div>
  )
}