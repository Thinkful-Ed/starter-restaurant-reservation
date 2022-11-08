import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";
import "./reservation.css"
function ReservationCard({ reservation, loadReservations, setError, index }) {
  const history = useHistory()
  const handleCancelReservation = async (event) => {
    event.preventDefault();
    try {
      setError(null)
      const abortController = new AbortController();
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        await updateReservationStatus(
          "cancelled",
          reservation.reservation_id,
          abortController.signal
        );
        history.go()
        //loadReservations();
        return () => abortController.abort();
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="reservation-card" key={index}>

      <div className="res-id reservation-data">id:{reservation.reservation_id}</div>

      <div className="reservation-row">
        <div className="reservation-data">Name: {reservation.first_name} {reservation.last_name}</div>
        <div className="reservation-data">Party Size: {reservation.people}</div>
      </div>

      <div className="reservation-row-1">
        <div className="reservation-data">Phone: {reservation.mobile_number}</div>
        <div className="reservation-data">Date: {reservation.reservation_date}</div>
        <div className="reservation-data">Time: {reservation.reservation_time}</div>
      </div>

      <div className="reservation-status" data-reservation-id-status={reservation.reservation_id}>
        Status: <div className={reservation.status === "booked" ? "reservation-status-booked" : "reservation-status-done"}>{reservation.status}</div>
      </div>

      <div className="reservation-row-2">
      <div>
        {reservation.status === "booked" ? (
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button
              type="button"
              href={`/reservations/${reservation.reservation_id}/seat`}
              value={`${reservation.reservation_id}`}
              className="reservation-button"
            >
              Seat
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div>
        {reservation.status !== "finished" &&
        reservation.status !== "cancelled" ? (
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button
              type="button"
              href={`/reservations/${reservation.reservation_id}/edit`}
              value={`${reservation.reservation_id}`}
              className="reservation-button"
            >
              Edit
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {reservation.status !== "finished" &&
      reservation.status !== "cancelled" ? (
        <div>
          <button
            type="button"
            data-reservation-id-cancel={`${reservation.reservation_id}`}
            onClick={handleCancelReservation}
            className="reservation-button-cancel"
          >
            Cancel
          </button>
        </div>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
}

export default ReservationCard;
