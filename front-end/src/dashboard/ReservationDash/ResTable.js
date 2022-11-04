import React from "react";
import ResRow from "./ResRow";
import { cancelRes } from "../../utils/api";
import { useHistory } from "react-router-dom";

export default function ResTable({
    reservations,
    setReservations,
    setError,
  }) {
    const history = useHistory();
    if (!reservations) {
      return null;
    }

    async function cancelReservation(reservation) {
        try {
          const { status } = await cancelRes(reservation.reservation_id);
          const updated = reservations.map((res) => {
            if (res.reservation_id === reservation.reservation_id) {
              res.status = status;
            }
            return res;
          });
          setReservations(updated);
          history.go(`/dashboard?date=${reservation.reservation_date}`);
        } catch (err) {
          setError(err);
        }
      }

      const formatted = reservations.map((res) => {
        return (
          <ResRow
            key={res.reservation_id}
            reservation={res}
            cancelRes={cancelReservation}
            purpose={"dashboard"}
          />
        );
      });
    
      return (
        <>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Party Size</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                <th scope="col">Seat</th>
                <th scope="col">Edit</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            <tbody>{formatted}</tbody>
          </table>
          </div>
        </>
      );
  }

