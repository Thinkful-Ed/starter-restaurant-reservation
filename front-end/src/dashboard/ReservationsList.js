import React from 'react';
import Reservation from './Reservation';

const ReservationsList = ({reservations}) => {
    return (
        <section>
            {reservations.map((reservation, index) => <Reservation key={index} reservation={reservation} />)}
        </section>
    )
}

export default ReservationsList;