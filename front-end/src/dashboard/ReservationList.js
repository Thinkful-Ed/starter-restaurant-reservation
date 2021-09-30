
function ReservationList({reservations}){
    const reservationsList = reservations.map(
        ({
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time,
          people,
          reservation_id,
        }) => (
          <table key={reservation_id}>
            <tbody>
              <tr>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_date.substr(0, 10)}</td>
                <td>{reservation_time.substr(0, 5)}</td>
                <td>{people}</td>
                <td data-reservation-id-status={reservation_id}></td>
              </tr>
            </tbody>
          </table>
        )
      );
      return (
        <>
          {reservationsList}
        </>
      );
}

export default ReservationList;