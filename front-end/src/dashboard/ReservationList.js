import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function ReservationList({ reservations, date, onSearchPage }) {

    const history = useHistory();

    console.log("ReservationList component", reservations);
    return (
        <div className={onSearchPage ? `col` : `col col-md-6`}>
            {!onSearchPage && (<section className="datesNav mb-2">
                <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
                <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
                <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
            </section>)}
            <div className="table-responsive">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>PHONE</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>PEOPLE</th>
                            <th>STATUS</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length ? (reservations.map((reservation) => {
                            const { reservation_id } = reservation;
                            return (
                                <tr key={reservation_id}>
                                    <td>{reservation_id}</td>
                                    <td>{`${reservation.last_name}, ${reservation.first_name}`}</td>
                                    <td>{reservation.mobile_number}</td>
                                    <td>{reservation.reservation_date}</td>
                                    <td>{reservation.reservation_time}</td>
                                    <td>{reservation.people}</td>
                                    <td data-reservation-id-status={reservation_id}>{reservation.status}</td>
                                    <td>
                                        {reservation.status === "booked" && (
                                            <a
                                                className="btn btn-secondary"
                                                href={`/reservations/${reservation_id}/seat`}
                                                role="button"
                                            >Seat</a>
                                        )}
                                    </td>
                                    <td>{reservation.status === "booked" && (<button className="btn btn-secondary">Edit</button>)}</td>
                                    <td>{reservation.status === "booked" && (<button className="btn btn-secondary">Cancel</button>)}</td>
                                </tr>
                            )
                        })) : <tr><td colSpan="6">No reservations found.</td></tr>}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ReservationList;