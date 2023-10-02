
function ReservationCard({reservation}) {
    const {reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people} = reservation
    return <div className="bg-warning">
        <h2>{`${last_name}, ${first_name}(${people})`}</h2>
        <h5>{reservation_date} @ {reservation_time}</h5>
        <p>Ph#: {mobile_number}</p>
        <a href={`/reservations/${reservation_id}/seat`}>
            <button>Seat</button>            
        </a>

    </div>
}

export default ReservationCard