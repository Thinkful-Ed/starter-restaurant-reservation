
import {Link} from 'react-router-dom';



function ResCard(props) {
    let mode = props.mode;
    console.log(mode)
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
                <h5 className="card-title">Name:&nbsp;{props.reservation.first_name} {props.reservation.last_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Phone:&nbsp;{props.reservation.mobile_number}</h6>
                <p className="card-text">{props.reservation.message}</p>
                <p className="card-text">Time:&nbsp;{time}</p>
                <p className="card-text">Date:&nbsp;{props.reservation.reservation_date}</p>
                <p className="card-text" data-reservation-id-status={props.reservation.reservation_id}>Status:&nbsp;{props.reservation.status}</p>
                <p className="card-text">Party Size:&nbsp;{props.reservation.people}</p>
                {(mode === "single" || props.reservation.status === "seated")? 
                (
                <></>
                )
                 : 
                 (
                    <Link to={`/reservations/${props.reservation.reservation_id}/seat`}><button className="btn btn-primary" href={`/reservations/${props.reservation.reservation_id}/seat`}>Seat</button></Link>
                 )}
                
            </div>
        </div>
    )
}


export default ResCard;