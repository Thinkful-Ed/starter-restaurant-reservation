import React from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function ReservationList({ reservations, loadDashboard, setError }) {
  async function handleCancelReservation(reservationId) {
    const abortController = new AbortController();

    try {
      const confirmCancel = window.confirm(
        "Do you want to cancel this reservation?"
      );

      if (confirmCancel) {
        await cancelReservation(reservationId, abortController.signal);
        loadDashboard();
      }
    } catch (error) {
      setError(error);
    } finally {
      abortController.abort();
    }
  }

  return (
    <table className="table">
      <thead>
        <tr className="text-center">
          <th className="border border-dark">Name</th>
          <th className="border border-dark">Mobile Number</th>
          <th className="border border-dark">Reservation Date</th>
          <th className="border border-dark">Party Size</th>
          <th className="border border-dark">Status</th>
          <th className="border border-dark">Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.reservation_id} className="text-center">
            <td className="border border-dark">
              {reservation.first_name} {reservation.last_name}
            </td>
            <td className="border border-dark">
              {reservation.mobile_number}
            </td>
            <td className="border border-dark">
              {reservation.reservation_date} {reservation.reservation_time}
            </td>
            <td className="border border-dark">
              {reservation.people}
            </td>
            <td className="border border-dark" data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </td>
            <td className="text-center border border-dark" >
              {reservation.status === "booked" ? (
                <div>
                  <button
                    className="btn btn-danger btn-sm mr-1"
                    data-reservation-id-cancel={reservation.reservation_id}
                    onClick={() =>
                      handleCancelReservation(reservation.reservation_id)
                    }
                  >
                    Cancel
                  </button>
                  
                  <Link
                    to={`/reservations/${reservation.reservation_id}/edit`}
                    className="btn btn-primary btn-sm mr-1"
                    role="button"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/reservations/${reservation.reservation_id}/seat`}
                    className="btn btn-success btn-sm"
                    role="button"
                  >
                    Seat
                  </Link>
                </div>
              ) : (
                " "
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReservationList;
