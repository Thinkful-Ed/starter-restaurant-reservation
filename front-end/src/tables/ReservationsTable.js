import React from "react";
import { Link } from "react-router-dom";
import { updateStatus } from "../utils/api";

function ReservationsTable({ reservations, setReservations, setErrorMessages }) {
    async function updateStatusHandler(reservation_id, status) {
      const abortController = new AbortController();
      try {
        await updateStatus(reservation_id, status, abortController.signal);
        // Update the local state to reflect changes
        const updatedReservations = reservations.map(reservation =>
          reservation.reservation_id === reservation_id ? { ...reservation, status } : reservation
        );
        setReservations(updatedReservations);
      } catch (error) {
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, error.message]);
      }
    }

    const finishReservationHandler = async (reservation_id) => {
        if (window.confirm("Do you want to cancel this reservation?")) {
          await updateStatusHandler(reservation_id, "finished");
        }
      };

    const columnHeadingsForReservationTable = ( 
            <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Reservation Date</th>
                <th scope="col">Reservation Time</th>
                <th scope="col">People</th>
                <th scope="col">Status</th>
            </tr>);

    const reservationsForThisDate = reservations.length ? (
        reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
                <th scope="row">{reservation.reservation_id}</th>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td>{reservation.status}</td>
                {reservation.status === "booked" && (
                    <>
                        <td>
                            <Link to={`/reservations/${reservation.reservation_id}/edit`}
                                  className="btn btn-secondary">
                                Edit
                            </Link>
                        </td>
                        <td>
                            <Link to={`/reservations/${reservation.reservation_id}/seat`}
                                  className="btn btn-primary">
                                Seat
                            </Link>
                        </td>
                        <td>
                            <button type="button"
                                    className="btn btn-danger"
                                    onClick={() => finishReservationHandler(reservation.reservation_id)}>
                                Cancel
                            </button>
                        </td>
                    </>
                )}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="8" className="text-center">
                No reservations for this date.
            </td>
        </tr>
    );

    return (
        <table className="table">
            <thead>
                {columnHeadingsForReservationTable} 
            </thead>
            <tbody>
                {reservationsForThisDate}
            </tbody>
        </table>
    );

  }
export default ReservationsTable;


