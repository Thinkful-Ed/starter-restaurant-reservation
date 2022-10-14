function Reservation({ reservation }) {
  return (
    <div class="card">
      <h5 class="card-header">
        {reservation.first_name} {reservation.last_name}
      </h5>
      <div class="card-body">
        <h5 class="card-title">Time: {reservation.reservation_time}</h5>
        <p class="card-text">People: {reservation.people}</p>
        <p class="card-text">Phone: {reservation.mobile_number}</p>
        <a
          href={`/reservations/${reservation.reservation_id}/seat`}
          class="btn btn-primary"
        >
          Seat
        </a>
      </div>
    </div>
  );
}

export default Reservation;
