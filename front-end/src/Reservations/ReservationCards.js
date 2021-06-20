function ReservationCards({ reservation, date }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation;

  return (
    <div
      className="card border-success mb-3"
      style={{ maxWidth: "40rem" }}
      key={reservation_id}
    >
      <div className="card-header bg-transparent border-success">
        {reservation_date}
      </div>
      <div className="card-body text-success">
        <h5 className="card-title">{reservation_time}</h5>
        <p className="card-text">
          {first_name} {last_name}
        </p>
        <p className="card-text">Number of people: {people}</p>
      </div>
      <div className="card-footer bg-transparent border-success">
        {mobile_number}
      </div>
    </div>
  );
}

export default ReservationCards;
