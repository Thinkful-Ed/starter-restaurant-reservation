import React from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

function DisplayReservations({ reservation }) {
  const { reservation_id } = useParams();
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {reservation.first_name} {reservation.last_name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Mobile Number: {reservation.mobile_number}
          </h6>
          <p className="card-text">Date: {reservation.reservation_date}</p>
          <p className="card-text">Time: {reservation.reservation_time}</p>
          <p className="card-text">Party Size: {reservation.people}</p>
          {reservation_id ? null : (
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary">Seat</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default DisplayReservations;
