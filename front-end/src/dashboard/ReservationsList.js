import NotFound from "../layout/NotFound"
import Reservation from "./Reservation"

function ReservationsList({reservations}){

if(reservations.length===0){
    return <NotFound/>
}else {
    const list = reservations.map((reservation)=> (
        <li key = {reservation.reservation_id}>
            <Reservation 
                key = {reservation.reservation_id}
                reservation= {reservation}
                reservationId = {reservation.reservation_id}
            />
        </li>
    ))


return (
    <>
    <ul className="list-unstyled">
        {list}
    </ul>
    </>
)
}
}

export default ReservationsList