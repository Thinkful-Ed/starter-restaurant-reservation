import React from "react";
import { useHistory } from "react-router";
import { cancelReservation } from "../utils/api";

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
  if (reservation.status !== "finished" && reservation.status !== "cancelled") {
    return (
      <button
        onClick={() => cancelHandle(reservation.reservation_id)}
        data-reservation-id-cancel={reservation.reservation_id}
        className="btn btn-danger"
      >
        Cancel
      </button>
    );
  } else {
    return "";
  }
}

export default CancelButton;
