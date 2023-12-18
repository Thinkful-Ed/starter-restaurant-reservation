import React from "react";
import ReservationRow from "./ReservationRow";
import { cancelReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";

export default function ReservationTable({
  reservations,
  setReservations,
  setError,
}) {
  const history = useHistory();
  if (!reservations) {
    return null;
  }

  async function cancelRes(reservation) {
    try {
      const { status } = await cancelReservation(reservation.reservation_id);
      const updated = reservations.map((res) => {
        if (res.reservation_id === reservation.reservation_id) {
          res.status = status;
        }
        return res;
      });
      setReservations(updated);
      history.go(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setError(error);
    }
  }

  const formatted = reservations.map((res) => {
    return (
      <ReservationRow
        key={res.reservation_id}
        reservation={res}
        cancelRes={cancelRes}
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
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </>
  );
}
