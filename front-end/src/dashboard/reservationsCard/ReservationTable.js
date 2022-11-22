import React from "react";
import Listing from "./Listing";

function ReservationTable({reservations}) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Mobile Number</th>
                    <th>Time</th>
                    <th>Party</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map(reservation => <Listing key={`reservation-${reservation.reservation_id}`} reservation={reservation} />)}
            </tbody>
        </table>
    );
}

export default ReservationTable;
