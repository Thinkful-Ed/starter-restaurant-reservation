function ReservationTable({ reservation }) {
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
    <tbody key={reservation_id}>
      <tr>
        <th scope="row">{reservation_id}</th>
        <td>{reservation_date}</td>
        <td>{reservation_time}</td>
        <td>{first_name}</td>
        <td> {last_name}</td>
        <td>{mobile_number}</td>
        <td>{people}</td>
      </tr>
    </tbody>
  );
}

export default ReservationTable;
