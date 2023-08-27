import React from 'react';
import { formatAsDate, formatAsTime } from '../utils/date-time';
import { Link } from 'react-router-dom';

export default function ReservationsList({ reservations, date, handleCancel }) {
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.status !== 'cancelled' && reservation.status !== 'finished'
  );

  return (
    <div className='text-center'>
      {filteredReservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className='d-flex flex-wrap'>
          {filteredReservations.map((reservation) => (
            <div key={reservation.reservation_id} className="w-25 p-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Reservation ID: {reservation.reservation_id}</h4>
                </div>
                <div className="card-body">
                  <p className="card-text">First Name: {reservation.first_name}</p>
                  <p className="card-text">Last Name: {reservation.last_name}</p>
                  <p className="card-text">Mobile Number: {reservation.mobile_number}</p>
                  <p className="card-text">Date: {formatAsDate(reservation.reservation_date)}</p>
                  <p className="card-text">Time: {formatAsTime(reservation.reservation_time)}</p>
                  <p className="card-text">Party Size: {reservation.people}</p>
                  <p className="card-text" data-reservation-id-status={reservation.reservation_id}>
                    Status: {reservation.status}
                  </p>
                </div>
                <div className="card-footer">
                  <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                    <button className="btn btn-primary ml-2">Edit</button>
                  </Link>
                  {reservation.status === 'booked' && (
                    <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                      <button className="btn btn-success ml-2">Seat</button>
                    </Link>
                  )}
                  <button
                    className="btn btn-danger ml-2"
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
