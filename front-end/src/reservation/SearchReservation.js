import React from 'react';
import { searchByMobile } from '../utils/api';
import { updateReservationStatus } from '../utils/api';
import { useState } from 'react';
import ReservationsList from '../dashboard/ReservationsList';
import ErrorAlert from '../layout/ErrorAlert';

export default function SearchReservation() {
  const [mobile_number, setMobile_number] = useState('');
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  function handleChange(event) {
    setMobile_number(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const reservations = await searchByMobile(mobile_number, abortController.signal);
      setReservations(reservations);
    } catch (error) {
      setReservationsError(error);
    }
  }

  async function handleCancel(reservationId) {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      const abortController = new AbortController();
      const cancelled = 'cancelled';
      try {
        await updateReservationStatus(reservationId, cancelled, abortController.signal);
        setReservations((prevReservations) => {
          const updatedReservations = prevReservations.map((reservation) =>
            reservation.reservation_id === reservationId
              ? { ...reservation, status: 'cancelled' }
              : reservation
          );
          return updatedReservations;
        });
      } catch (error) {
        setReservationsError(error);
      }
    }
  }

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.status !== 'cancelled' && reservation.status !== 'finished'
  );

  return (
    <div>
      <div>
        <h1>Search Reservation</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <ErrorAlert error={reservationsError} />
            <div className="form-group">
              <label htmlFor="mobile_number">Mobile Number:</label>
              <input
                name="mobile_number"
                id="mobile_number"
                type="tel"
                value={mobile_number}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter a customer's phone number"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Find
            </button>
          </form>
        </div>
      </div>
      <div>
        <ReservationsList
          reservations={filteredReservations}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
}
