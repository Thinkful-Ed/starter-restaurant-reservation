import React from "react";

export default function ReservationsTable({reservations}) {
    const reservationsTableRows = reservations.map((reservation) => {
        return (
            <tr key={reservation.reservation_id}>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.last_name}, {reservation.first_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
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
                <tbody>{reservationsTableRows}</tbody>
            </table>
        </div>
    );
}
