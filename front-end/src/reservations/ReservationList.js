import React from "react";
import {
  getBadgeVariantReservation,
  formatPhoneNumber,
} from "../utils/helpers";

function ReservationList({ reservations }) {
  let reservationsMap;
  if (reservations.length === 0) {
    reservationsMap = (
      <tr>
        <td colSpan="8">There are no reservations for this day.</td>
      </tr>
    );
  } else {
    reservationsMap = reservations.map((reservation) => (
      <tr key={reservation.reservation_id}>
        <td className="align-middle text-capitalize">
          <span
            className={`badge bg-${getBadgeVariantReservation(
              reservation.status
            )}`}
            data-reservation-id-status={reservation.reservation_id}
          >
            {reservation.status}
          </span>
        </td>
        <td className="align-middle">
          {reservation.first_name} {reservation.last_name}
        </td>
        <td className="align-middle">
          {formatPhoneNumber(reservation.mobile_number)}
        </td>
        <td className="align-middle">{reservation.reservation_date}</td>
        <td className="align-middle">{reservation.reservation_time}</td>
        <td className="align-middle">{reservation.people}</td>
        <td className="align-middle">
          <div className="d-flex justify-content-center">
            {reservation.status === "booked" && (
              <a
                href={`/reservations/${reservation.reservation_id}/seat`}
                type="button"
                className="btn btn-outline-info btn-sm m-2"
              >
                Seat
              </a>
            )}
            <a
              href={`/reservations/${reservation.reservation_id}/edit`}
              type="button"
              className="btn btn-outline-secondary btn-sm m-2"
            >
              Edit
            </a>
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              type="button"
              className="btn btn-outline-danger btn-sm m-2"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered table-sm text-center">
        <thead className="thead-light">
          <tr>
            <th scope="col" className="align-middle">
              Status
            </th>
            <th scope="col" className="align-middle">
              Full Name
            </th>
            <th scope="col" className="align-middle">
              Phone Number
            </th>
            <th scope="col" className="align-middle">
              Reservation Date
            </th>
            <th scope="col" className="align-middle">
              Reservation Time
            </th>
            <th scope="col" className="align-middle">
              Party Size
            </th>
            <th scope="col" className="align-middle">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{reservationsMap}</tbody>
      </table>
    </div>
  );
}

export default ReservationList;
