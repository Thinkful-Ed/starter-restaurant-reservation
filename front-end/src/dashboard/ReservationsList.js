import React from 'react';
import { formatAsDate, formatAsTime } from '../utils/date-time';
import { Link } from 'react-router-dom';

export default function ReservationsList({ reservations, date, handleCancel }) {
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.status !== 'cancelled' && reservation.status !== 'finished'
  );

  return (
    <div>
      {filteredReservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div>
          {filteredReservations.map((reservation) => (
            <div key={reservation.reservation_id}>
              <div className="card">
                <div className="card-body">
                  <p> ID#: {reservation.reservation_id}</p>
                  <p>First Name: {reservation.first_name}</p>
                  <p>Last Name: {reservation.last_name}</p>
                  <p>Mobile Number: {reservation.mobile_number}</p>
                  <p>Date: {formatAsDate(reservation.reservation_date)}</p>
                  <p>Time: {formatAsTime(reservation.reservation_time)}</p>
                  <p>Party Size: {reservation.people}</p>
                  <p data-reservation-id-status={reservation.reservation_id}>
                    Status: {reservation.status}
                  </p>
                </div>
                <div className="card-footer">
                  <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                  {reservation.status === 'booked' ? (
                    <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                      <button className="btn btn-success">Seat</button>
                    </Link>
                  ) : (
                    <></>
                  )}
                  <button
                    className="btn btn-danger"
                    data-reservation-id-cancel={reservation.reservation_id}
                    onClick={() => handleCancel(reservation.reservation_id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
