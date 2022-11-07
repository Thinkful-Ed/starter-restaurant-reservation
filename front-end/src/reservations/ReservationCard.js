import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

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
    <span key={index}>
      <div>{reservation.reservation_id}</div>
      <div>{reservation.first_name}</div>
      <div>{reservation.last_name}</div>
      <div>{reservation.people}</div>
      <div>{reservation.mobile_number}</div>
      <div>{reservation.reservation_date}</div>
      <div>{reservation.reservation_time}</div>
      <div data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </div>
      <div>
        {reservation.status === "booked" ? (
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button
              type="button"
              href={`/reservations/${reservation.reservation_id}/seat`}
              value={`${reservation.reservation_id}`}
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
          >
            Cancel
          </button>
        </div>
      ) : (
        <></>
      )}
    </span>
  );
}

export default ReservationCard;
