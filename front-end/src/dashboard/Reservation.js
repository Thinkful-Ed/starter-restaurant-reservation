import React from 'react';

const Reservation = ({reservation}) => {
    const { first_name , last_name, mobile_number, reservation_date, reservation_time, people } = reservation;
    return (
        <div>
            <h3>{last_name}, {first_name}</h3>
            <p>mobile-number : {mobile_number}</p>
            <p>reservation date :{reservation_date}</p>
            <p>reservation time : {reservation_time}</p>
            <p>people : {people}</p>
        </div>
    )
}

export default Reservation;