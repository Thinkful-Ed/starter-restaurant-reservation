import React from "react";
import { getBadgeVariantReservation } from "../utils/helpers";

function ReservationList({ reservations }) {
  let reservationsMap;
  if (reservations.length === 0) {
    reservationsMap = (
      <tr>
        <td colSpan="7">There are no reservations for this day.</td>
      </tr>
    );
  } else {
    reservationsMap = reservations.map((reservation) => (
      <tr key={reservation.reservation_id}>
        <td className="align-middle">
          {reservation.first_name} {reservation.last_name}
        </td>
        <td className="align-middle">{reservation.mobile_number}</td>
        <td className="align-middle">{reservation.reservation_date}</td>
        <td className="align-middle">{reservation.reservation_time}</td>
        <td className="align-middle">{reservation.people}</td>
        <td className="align-middle text-capitalize">
          <span
            className={`badge bg-${getBadgeVariantReservation(reservation.status)}`}
            data-reservation-id-status={reservation.reservation_id}
          >
            {reservation.status}
          </span>
        </td>
        <td className="align-middle">
          {reservation.status === "booked" && (
            <a
              href={`/reservations/${reservation.reservation_id}/seat`}
              type="button"
              className="btn btn-outline-info btn-sm align-middle"
            >
              Seat
            </a>
          )}
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-responsive table-hover">
      <table className="table text-center table-sm mb-1 mt-1 table-striped border bg-light">
        <thead>
          <tr>
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
              Reservation Status
            </th>
            <th scope="col" className="align-middle"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{reservationsMap}</tbody>
      </table>
    </div>
  );
}

export default ReservationList;
