import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate, formatAsTime } from "../utils/date-time";


const Reservation = ({ reservation }) => {
  const [error, setError] = useState(false);
  const history = useHistory();

  async function handleCancel(reservationId) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      try {
        await cancelReservation(reservationId);
        history.go();
      } catch (err) {
        setError(err);
      }
    }
  }

  const people = reservation.people < 2 ? "person" : "people";

  return (
    <div>
      <ErrorAlert error={error} />

      {reservation.status !== "finished" && (
        <div key={reservation.reservation_id} className="card col-md-auto bg-light">
          <div className="card-body">
            <h5 className="card-title">Reservation for: {reservation.first_name} {reservation.last_name}</h5>
            <p className="card-text"><small className="text-muted">For {reservation.people} {people}</small></p>
            <p className="card-text">Phone Number: {reservation.mobile_number}</p>
            <p className="card-text">Date: {formatAsDate(reservation.reservation_date)}</p>
            <p className="card-text">Time: {formatAsTime(reservation.reservation_time)}</p>
            <p className="card-text" data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
            <button 
              className="btn btn-danger"
              onClick={() => handleCancel(reservation.reservation_id)}  
              data-reservation-id-cancel={`${reservation.reservation_id}`}
            >
              Cancel
            </button>
            <Link className="btn btn-secondary" to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link>
            {reservation.status === "booked" && (
              <Link className="btn btn-primary" to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;