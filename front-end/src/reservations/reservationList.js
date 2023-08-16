import React from "react";
import { useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function ReservationList({ reservations, loadDashboard, setError }) {
  const history = useHistory();

  async function handleCancelReservation(reservationId) {
    const abortController = new AbortController();

    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this reservation? This cannot be undone."
      );

      if (confirmCancel) {
        await cancelReservation(reservationId, abortController.signal);
        loadDashboard();
      }
    } catch (error) {
      setError(error);
    } finally {
      abortController.abort();
    }
  }

  return (
    <div>
      {reservations.map((reservation) => (
        <div key={reservation.reservation_id}>
          <p>
            {reservation.first_name} {reservation.last_name}
          </p>
          <p>{reservation.mobile_number}</p>
          <p>
            {reservation.reservation_date} {reservation.reservation_time}
          </p>
          <p>Party Size: {reservation.people}</p>
          <p>Status: {reservation.status}</p>
          {reservation.status === "booked" && (
            <button onClick={() => handleCancelReservation(reservation.reservation_id)}>
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReservationList;