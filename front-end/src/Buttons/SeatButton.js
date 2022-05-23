import React from "react";

function SeatButton({ reservation }) {
    if (reservation.status !== "seated") {
      return (
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          <button type="button" className="btn btn-success">
            Seat
          </button>
        </a>
      );
    } else {
      return "";
    }
  }

  export default SeatButton