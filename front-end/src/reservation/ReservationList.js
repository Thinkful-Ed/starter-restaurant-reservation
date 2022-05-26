function ReservationList({ reservations }) {
    const content = reservations.length ? reservations.map((reservation) => <li key={reservation.reservation_id}>{JSON.stringify(reservation)}</li>) : <p>No reservations for this date.</p>
  
    return (
      <>
        {content}
      </>
    );
  }
  
  export default ReservationList