import React from "react";
import ReservationRow from "./ReservationRow";

export default function ReservationTable({ reservations }) {
  if (!reservations) {
    return null;
  }

  const formatted = reservations.map((res) => {
    return (
      <ReservationRow
        key={res.reservation_id}
        reservation_id={res.reservation_id}
        first_name={res.first_name}
        last_name={res.last_name}
        mobile_number={res.mobile_number}
        people={res.people}
        reservation_time={res.reservation_time}
        reservation={res}
      />
    );
  });

  return (
    <>
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Number</th>
            <th scope="col">Guests</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </>
  );
}
