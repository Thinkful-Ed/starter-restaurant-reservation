import React from "react";
import { useHistory } from "react-router";
import { cancelReservation } from "./api";

function CancelButton({ reservation, setError }) {
  const history = useHistory();

  async function cancelHandle(reservationId) {
    const confirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirm) {
      try {
        await cancelReservation(reservationId);
        history.go(0);
      } catch (err) {
        setError(err.message);
      }
    }
  }

  return (
    <button
      onClick={() => cancelHandle(reservation.reservation_id)}
      data-reservation-id-cancel={reservation.reservation_id}
    >
      Cancel
    </button>
  );
}

export default CancelButton;
