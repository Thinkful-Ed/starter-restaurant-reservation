
function ReservationCard({reservation}) {
    console.log(reservation)
    const {reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people} = reservation
    console.log("reservation date ", reservation_date)
    console.log("current date ", Date())
    return <div className="bg-warning">
        <h2>{`${last_name}, ${first_name}(${people})`}</h2>
        <h5>{reservation_date} @ {reservation_time}</h5>
        <p>Ph#: {mobile_number}</p>
        <button>Edit</button>
        <button>Delete</button>
    </div>
}

export default ReservationCard