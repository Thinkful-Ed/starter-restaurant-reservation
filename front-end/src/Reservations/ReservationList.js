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
    <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>People</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {reservations.map((reservation) => {
          //reservation is seated when a table has it's reservation id otherwise it is booked
          //if table_id has reservation id then reservation.status= seated else reservation.status = booked
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
  )
}