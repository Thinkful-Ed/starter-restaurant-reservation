import React from "react";
import { cancelReservation } from "../utils/api";

export default function Reservation({ reservation, loadDashboard }) {
  const {
    reservation_id,
    first_name,
    last_name,
    reservation_time,
    people,
    mobile_number,
    status,
  } = reservation;

  function handleClick() {
    if (window.confirm("Would you like to cancel this reservation?")) {
      const abortController = new AbortController();

      cancelReservation(reservation_id, abortController.signal)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }
  const statusElement =
    status === "booked" ? (
      <div
        style={{ cursor: "default" }}
        className="btn border border-success rounded text-success"
      >
        Booked
      </div>
    ) : status === "seated" ? (
      <div
        style={{ cursor: "default" }}
        className="btn border border-warning rounded text-warning"
      >
        Seated
      </div>
    ) : status === "cancelled" ? (
      <div
        style={{ cursor: "default" }}
        className="btn border border-danger rounded text-danger"
      >
        Cancelled
      </div>
    ) : (
      <div
        style={{ cursor: "default" }}
        className="btn border border-muted rounded text-muted"
      >
        Finished
      </div>
    );

  return (
    <>
      <div>
        <h5>
          <div>
            {first_name} {last_name}
          </div>

          <div>{reservation_time}</div>
        </h5>

        <div>
          <div>
            <div>
              <p>{mobile_number}</p>

              <p>People: {people}</p>
            </div>
            <div>
              <div data-reservation-id-status={reservation.reservation_id}>
                {statusElement}
              </div>

              <div>
                <a href={`/reservations/${reservation_id}/edit`}>
                  <button>Edit</button>
                </a>
                <button
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={handleClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {status === "booked" && (
          <a href={`/reservations/${reservation_id}/seat`} role="button">
            <h5>Seat</h5>
          </a>
        )}
      </div>
    </>
  );
}
