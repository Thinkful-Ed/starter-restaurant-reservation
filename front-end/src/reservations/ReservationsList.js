import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservationStatus } from "../utils/api";

export default function ReservationsList({ reservation }) {
  const [error, setError] = useState([]);
  const history = useHistory();

  // This function sends an PUT request to the API
  // Updates the reservation status to cancelled
  // If user selects ok on the window.confirm message
  async function handleCancel(event) {
    event.preventDefault();
    const abortController = new AbortController();
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      try {
        const newStatus = "cancelled";
        await cancelReservationStatus(
          reservation.reservation_id,
          newStatus,
          abortController.signal
        );
        history.go(0);
      } catch (error) {
        setError([error.message]);
      }
    }
  }

  return (
    <div className="card border-dark text-center mb-3">
      <hr />
      <ErrorAlert error={error} />
      <div key={reservation.reservation_id}>
        <div className="card-header bg-dark text-white">
          <h4>
            {reservation.last_name} {reservation.first_name} Reservation
          </h4>
        </div>
        <div className="card-body">
          <p
            data-reservation-id-status={`${reservation.reservation_id}`}
            className="card-text"
          >
            <strong>Status:</strong> {reservation.status} <br />
            <strong>Mobile Number:</strong> {reservation.mobile_number} <br />
            <strong>Date:</strong> {reservation.reservation_date} <br />
            <strong>Time:</strong> {reservation.reservation_time} <br />
            <strong>Party Size:</strong> {reservation.people} <br />
          </p>
        </div>
        {reservation.status === "booked" ? (
          <button className="btn btn-dark mr-2">
            <Link
              to={`/reservations/${reservation.reservation_id}/seat`}
              style={{ color: "white" }}
            >
              Seat
            </Link>
          </button>
        ) : null}

        {reservation.status === "booked" ? (
          <button className="btn btn-outline-dark mr-2">
            <Link
              to={`/reservations/${reservation.reservation_id}/edit`}
              style={{ color: "black" }}
            >
              Edit
            </Link>
          </button>
        ) : null}

        <button
          className="btn btn-dark mr-2"
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <hr />
      </div>
    </div>
  );
}