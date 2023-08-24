import React from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function ReservationList({ reservations, loadDashboard, setError }) {
  async function handleCancelReservation(reservationId) {
    const abortController = new AbortController();

    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this reservation? This cannot be undone."
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
    <div className="container d-flex justify-content-center px-0">
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
                Party Size: {reservation.people}
              </td>
              <td className="border border-dark">
                Status: {reservation.status}
              </td>
              <td className="text-center border border-dark">
                {reservation.status === "booked" ||
                reservation.status === "seated" ||
                reservation.status === "canceled" ? (
                  <div className="btn-group" role="group">
                    <Link
                      to={`/reservations/${reservation.reservation_id}/seat`}
                      className="btn btn-success btn-sm mr-1"
                      role="button"
                    >
                      Seat
                    </Link>
                    <Link
                      to={`/reservations/${reservation.reservation_id}/edit`}
                      className="btn btn-secondary btn-sm mr-1"
                      role="button"
                    >
                      Edit
                    </Link>
                  </div>
                ) : null}
                {reservation.status === "booked" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleCancelReservation(reservation.reservation_id)
                    }
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;
