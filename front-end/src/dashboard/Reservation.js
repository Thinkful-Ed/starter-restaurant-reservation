function Reservation({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    reservation_time,
    people,
    mobile_number,
  } = reservation;
  return (
    <div class="card">
      <h5 class="card-header">
        {first_name} {last_name}
      </h5>
      <div class="card-body">
        <h5 class="card-title">Time: {reservation_time}</h5>
        <p class="card-text">People: {people}</p>
        <p class="card-text">Phone: {mobile_number}</p>
        <a
          className="btn btn-primary"
          href={`/reservations/${reservation_id}/seat`}
        >
          Seat
        </a>
      </div>
    </div>
  );
}

export default Reservation;
