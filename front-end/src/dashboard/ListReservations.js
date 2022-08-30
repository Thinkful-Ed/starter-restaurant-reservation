import { useHistory } from "react-router-dom";

function ListReservations({reservation}) {
    return ( 
        <div className="div">
            <div>
                <h3>{`${reservation.first_name} ${reservation.last_name}'s Reservation`}</h3>
            </div>
            <div>
                <h4>Check-in Time</h4>
                <p>{reservation.reservation_time}</p>
            </div>
            <div>
                <h4>Reservation Date</h4>
                <p>{reservation.reservation_date}</p>
            </div>
            <div>
                <h4>Guest Amount</h4>
                <p>{reservation.people}</p>
            </div>
            <div>
                <h4>Contact Info</h4>
                <p>{reservation.mobile_number}</p>
            </div>
        </div>
     );
}

export default ListReservations;
