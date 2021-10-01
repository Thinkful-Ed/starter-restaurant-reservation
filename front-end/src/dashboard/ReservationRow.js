import React from "react";

function ReservationRow({ reservation }) {
  if (!reservation || reservation.status === "finished") return null;

  const handleCancel = () => {
      if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
          //API WILL GO HERE

          window.location.reload()
      }
  }

  return (
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
          <a href={`/reservations/${reservation.reservation_id}/edit`}>
              <button type="button">Edit</button>
          </a>
      </td>
      <td>
          <button type="button" onClick={handleCancel} data-reservation-id-cancel={reservation.reservation_id}>Cancel</button>
      </td>
      {reservation.status === "booked" && (
        <td>
          <a href={`/reservations/${reservation.reservation_id}/seat`}>
            <button type="button">Seat</button>
          </a>
        </td>
      )}
    </tr>
  );
}

export default ReservationRow;
