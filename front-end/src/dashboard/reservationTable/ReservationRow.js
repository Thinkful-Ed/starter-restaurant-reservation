import React from "react";

export default function ReservationRow({
  num,
  first_name,
  last_name,
  mobile_number,
  people,
  reservation_time,
}) {
  return (
    <tr>
      <th scope="row">{num}</th>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{people}</td>
      <td>{reservation_time}</td>
    </tr>
  );
}
