import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ReservationCard({ reservation }) {
  const URL = process.env.REACT_APP_API_BASE_URL;

  const handleCancelClick = async (event) => {
    event.preventDefault();
    const message = `Do you want to cancel this reservation? This cannot be undone.`;

    // PUT request URL needs to be update to use the target's reservationId
    if (window.confirm(message)) {
      try {
        await axios.put(`${URL}/reservations/:reservation_id/status`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <tr>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      {reservation.status === "booked" && (
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          <button className="btn btn-success">Seat</button>
        </Link>
      )}
      <Link to={`/reservations/${reservation.reservation_id}/edit`}>
        <button className="btn btn-secondary">Edit</button>
      </Link>
      <button
        className="btn btn-danger"
        data-reservation-id-cancel={reservation.reservation_id}
        onClick={handleCancelClick}
      >
        Cancel
      </button>
    </tr>
  );
}
