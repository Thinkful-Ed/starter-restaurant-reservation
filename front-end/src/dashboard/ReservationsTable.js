export default function ReservationsTable({
  reservation: {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  },
}) {
  return (
    <div>
      <p>
        Name: {first_name} {last_name}
      </p>
      <p>Mobile Number: {mobile_number}</p>
      <p>Date: {reservation_date}</p>
      <p>Time: {reservation_time}</p>
      <p>People: {people}</p>
      <p data-reservation-id-status={reservation_id}>Status: {status}</p>
      {status === "booked" && (<a href={`/reservations/${reservation_id}/seat`}>
        <button className="btn btn-primary mr-2">Seat</button>
      </a>)}
    </div>
  );
}
