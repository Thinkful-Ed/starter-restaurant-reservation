import React from "react";

export default function ReservationsTable({reservations}) {

    const reservationsTableRow = reservations.map((reservation) => {
        return (
          <tr key={reservation.reservation_id}>
          <td>{reservation.reservation_id}</td>
          <td>{reservation.last_name}, {reservation.first_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
          <td>{reservation.status !== "booked" ? null : (
          <a
            className="btn btn-secondary"
            role="button"
            href={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </a>
          )}
          </td>
          </tr>
      );
      });

    return (
        <div> 
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>PEOPLE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>{reservationsTableRow}</tbody>
            </table>
        </div>
    );
}
