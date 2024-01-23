import React from "react";
import { cancelReservation } from "../utils/api";

function CancelReservation({ reservation_id, loadDashboard }) {
  const handleCancel = async () => {
    const abortController = new AbortController();
    const confirm = window.confirm(
      `Do you want to cancel this reservation?\nThis cannot be undone.`
    );
    if (confirm) {
      try {
        await cancelReservation(reservation_id);
        loadDashboard();
      } catch (error) {
        console.log(error);
      }
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <button
        data-reservation-id-cancel={reservation_id}
        type="button"
        className="btn btn-outline-danger btn-sm m-1"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
}
export default CancelReservation;
