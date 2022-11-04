import React from "react";

function TableRow({ reservation, index }) {
  // const handleSeatClick = () => console.log("seat");
  const handleEditClick = () => console.log("edit");
  const handleCancelClick = () => console.log("cancel");

  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>
        {reservation.last_name}, {reservation.first_name}
      </td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
        {reservation.status === "booked" ? (
          <a
            className="btn btn-primary"
            role="button"
            href={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </a>
        ) : null}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
