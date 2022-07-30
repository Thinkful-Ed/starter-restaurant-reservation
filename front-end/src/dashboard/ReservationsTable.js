import React from "react";
import { useHistory } from "react-router";
import { updateReservationStatus } from "../utils/api";

export default function ReservationsTable({reservations, setError}) {

    const ac = new AbortController();
    const history = useHistory();

    const handleCancel = async (event) => {
        event.preventDefault();
        const { reservationIdCancel } = event.target.dataset;
    
        if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
          try {
    
            await updateReservationStatus({status: "cancelled"}, reservationIdCancel, ac.signal);
            history.push("/dashboard");
          } catch (error) {
            setError(error);
          }
        }
      };
    
    const reservationsTableRow = reservations.map((reservation) => {
        return (
          <tr key={reservation.reservation_id}>
          <td>{reservation.reservation_id}</td>
          <td>{reservation.last_name}, {reservation.first_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
          <td>{reservation.status !== "booked" ? null : (
            <div>
            <a
            className="btn btn-secondary"
            role="button"
            href={`/reservations/${reservation.reservation_id}/seat`}
            >
            Seat
            </a>
            <a href={`/reservations/${reservation.reservation_id}/edit`}><button className="btn btn-secondary">Edit</button></a>
            <button data-reservation-id-cancel={reservation.reservation_id} className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          )}
          </td>
          </tr>
      );
      });

    return (
        <div> 
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>PEOPLE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>{reservationsTableRow}</tbody>
            </table>
        </div>
    );
}
