import React from "react";

function AllReservationsView({reservation}) {
    return <div>
        <p>
            {reservation.first_name} {reservation.last_name}, {reservation.reservation_date}, {reservation.reservation_time}, party of {reservation.people}
        </p>
    </div>
}

export default AllReservationsView;