




function ResCard(props) {
    let time = props.reservation.reservation_time;

    let timeSplit = time.split(":");
    let hour = timeSplit[0];
    let minute = timeSplit[1];
    let ampm = "AM";
    if (hour > 12) {
        hour = hour - 12;
        ampm = "PM";
    }
    if (hour === 0) {
        hour = 12;
    }
    time = hour + ":" + minute + " " + ampm;
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Name: {props.reservation.first_name} {props.reservation.last_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Phone: {props.reservation.mobile_number}</h6>
                <p className="card-text">{props.reservation.message}</p>
                <p className="card-text">Time:  {time}</p>
                <p className="card-text">Date:  {props.reservation.reservation_date}</p>
                <p className="card-text">Status:{props.reservation.status}</p>
                <p className="card-text">Party Size: {props.reservation.people}</p>
            </div>
        </div>
    )
}


export default ResCard;