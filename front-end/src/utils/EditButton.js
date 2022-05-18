import React from "react";

function EditButton({ reservation }) {
    if (reservation.status === "booked") {
      return (
        <a href={`/reservations/${reservation.reservation_id}/edit`}>
          <button>Edit</button>
        </a>
      );
    }
    else {
      return ''
    }
  }

  export default EditButton