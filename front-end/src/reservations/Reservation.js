import React from "react";
import {Link, useRouteMatch} from "react-router-dom";

function Reservation({reservation, handleReservationDelete}){
  const {url} = useRouteMatch();
    return(
        <div className="reservation" key={reservation.id}>
      <div className="reservation-body">
        
        <p className="reservation-text"><span className="font-weight-bold">First Name: </span> {reservation.firstName}</p>
        <p className="reservation-text"><span className="font-weight-bold">Last Name: </span> {reservation.lastName}</p>
        <p className="reservation-text"><span className="font-weight-bold">Phone: </span> {reservation.phone}</p>
        <p className="reservation-text"><span className="font-weight-bold">Date: </span> {reservation.date}</p>
        <p className="reservation-text"><span className="font-weight-bold">Time: </span> {reservation.time}</p>
        <p className="reservation-text"><span className="font-weight-bold"># in Party: </span> {reservation.party}</p>
        <Link to={`${url}/reservations/${reservation.id}/edit`} className="mt-2 mr-2">
          <button className="btn btn-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
            Edit
          </button>
        </Link>
        
        <button className="btn btn-danger float-right" onClick={()=>handleReservationDelete(reservation.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
      </div>
    </div>
    )
}
export default Reservation;