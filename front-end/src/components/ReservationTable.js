import React from 'react';
import { Link } from 'react-router-dom';

export const ReservationTable = ({
  reservations,
  handleCancel,
  filterResults,
}) => {
  function checkStatus(reservation) {
    return (
      reservation.status === 'finished' || reservation.status === 'cancelled'
    );
  }

  function formatTime(time) {
    let hours = Number(time.split(':')[0]);
    let minutes = Number(time.split(':')[1]);
    const pmHandler = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = hours + ':' + minutes + ' ' + pmHandler;
    return formattedTime;
  }

  function renderReservations(reservations) {
    if (reservations.length) {
      return reservations.map((reservation) => {
        return filterResults && checkStatus(reservation) ? (
          ''
        ) : (
          <div className='reservation' key={reservation.reservation_id}>
            <div>
              <div>
                <div>
                  <div>
                    <h4>
                      {reservation.first_name} {reservation.last_name}{' '}
                    </h4>
                    <p>Party of {reservation.people}</p>
                  </div>
                  <div>
                    <h5 className='blue inline'>
                      {formatTime(reservation.reservation_time)}
                    </h5>
                    <p>&nbsp; / &nbsp;mobile : {reservation.mobile_number}</p>
                    <p data-reservation-id-status={reservation.reservation_id}>
                      &nbsp; / &nbsp;<i>{reservation.status}</i>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {reservation.status === 'booked' ? (
                  <div className='group-reverse'>
                    <Link
                      to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      Seat
                    </Link>
                    <Link
                      to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      type='button'
                      data-reservation-id-cancel={reservation.reservation_id}
                      value={reservation.reservation_id}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div>
          <h4>No reservations found</h4>
        </div>
      );
    }
  }

  return <div>{renderReservations(reservations)}</div>;
};
