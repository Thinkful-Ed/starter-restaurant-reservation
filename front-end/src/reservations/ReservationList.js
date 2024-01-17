import React from "react";

function ReservationList({ reservations, loadDashboard }) {
    return (
        <div>
              {/* create a separate component for reservation list on dashboard  */}
        <ul className="list-group">
        {reservations.map((reservation) => (
          <li className="list-group-item w-75 mx-auto" key={reservation.reservation_id}>
            Name: {reservation.first_name} {reservation.last_name} 
            <br />
            Phone Number: {reservation.mobile_number}
            <br />
            Party Size: {reservation.people}
            <br />
            Date: {reservation.reservation_date}
            <br />
            Time: {reservation.reservation_time}
          </li>
        ))}
      </ul>
        </div>
    )
}

export default ReservationList;