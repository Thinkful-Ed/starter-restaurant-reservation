import React from "react";
import {Link} from 'react-router-dom';
export default function Reservation({reservation}){
  return <>
  <h2>{reservation.first_name}-{reservation.last_name}</h2>
  <p>Mobile Number: {reservation.mobile_number}</p>
  <p>Reservation Date: {reservation.reservation_date}</p>
  <p>Reservation Time: {reservation.reservation_time}</p>
  <p>People: {reservation.people}</p>
  <button><Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link></button>
  </>
}