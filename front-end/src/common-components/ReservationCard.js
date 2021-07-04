import { formatAsTime } from "../utils/date-time";

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
        </ul>
      </div>
    </div>
  );
}

export default ReservationCard;
