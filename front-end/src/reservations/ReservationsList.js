import React from "react";
import { setReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";

function ReservationsList({ reservations }) {
  const history = useHistory();

  const handleCancel = async (reservation_id) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await setReservationStatus(reservation_id, "cancelled");
      history.go(0);
    }
  };

  return (
    <div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations</h4>
      </div>

      <div>
        {reservations.map((reservation) => {
          return (
            <div key={reservation.reservation_id}>
              <span> {reservation.first_name} </span>
              <span> {reservation.last_name} </span>
              <span> {reservation.mobile_number} </span>
              <span> {reservation.reservation_date} </span>
              <span> {reservation.reservation_time} </span>
              <span> {reservation.people} </span>
              <div data-reservation-id-status={reservation.reservation_id}>
                RESERVATION STATUS {reservation.status || "booked"}
              </div>
              <div>
                {reservation.status === null && (
                  <a href={`/reservations/${reservation.reservation_id}/seat`}>
                    <button>Seat</button>
                  </a>
                )}
                <a href={`/reservations/${reservation.reservation_id}/edit`}>
                  <button>Edit</button>
                </a>
                <button
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={() => handleCancel(reservation.reservation_id)}>
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReservationsList;
