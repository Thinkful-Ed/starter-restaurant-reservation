import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AllReservationsView({reservation}) {

    const {first_name, last_name, reservation_date, reservation_time, people, reservation_id} = reservation

    return <div>
        <p>
            {first_name} {last_name}, {reservation_date}, {reservation_time}, party of {people}</p>
        {reservation_id && <Link to={`/reservations/${reservation_id}/seat`} className="btn btn-info">Seat</Link>}
    </div>
}

export default AllReservationsView;