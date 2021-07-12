import { formatAsTime } from "../utils/date-time";
import { Link } from "react-router-dom";
import titleCaser from "../utils/titleCaser";

function ReservationCard({ reservation }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {reservation.first_name} {reservation.last_name}
        </h5>
        <ul>
          <li>Phone: {reservation.mobile_number}</li>
          <li>Time: {formatAsTime(reservation.reservation_time)}</li>
          <li>People: {reservation.people}</li>
          <li data-reservation-id-status={reservation.reservation_id}>
            Status: {titleCaser(reservation.status)}
          </li>
        </ul>
        {reservation.status === "booked" && (
          <div className="card-footer">
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              Seat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
