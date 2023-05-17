import React from "react";

function DashboardItem({reservation}) {
    const {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people
    } = reservation
    return <div>
        <div>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Mobile Number: {mobile_number}</p>
            <p>Reservation Date: {reservation_date}</p>
            <p>Reservation Time: {reservation_time}</p>
            <p>Party Size: {people}</p>
        </div>
    </div>
}

export default DashboardItem