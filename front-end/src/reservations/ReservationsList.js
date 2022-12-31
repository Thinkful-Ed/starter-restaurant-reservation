import React from "react";

function ReservationsList({ reservations }) {
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReservationsList;
