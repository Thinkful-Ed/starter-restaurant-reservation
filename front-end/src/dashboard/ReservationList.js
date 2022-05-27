import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function ReservationList({ reservations, date }) {

    const history = useHistory();

    console.log("component", reservations);
    return (
        <div className="col col-md-6">
            <section className="datesNav">
                <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
                <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
                <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
            </section>
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
                        {Array.isArray(reservations) && reservations.map((reservation) => {
                            const {reservation_id} = reservation;
                            return (<tr key={reservation_id}>
                                <td>{reservation_id}</td>
                                <td>{`${reservation.first_name}, ${reservation.last_name}`}</td>
                                <td>{reservation.mobile_number}</td>
                                <td>{reservation.reservation_date}</td>
                                <td>{reservation.reservation_time}</td>
                                <td>{reservation.people}</td>
                                <td>booked</td>
                                {/* <td><button className="btn btn-secondary" onClick={() => history.push(`/reservations/${reservation.reservation_id}/seat`)}>Seat</button></td> */}
                                <td><a className="btn btn-secondary" href={`/reservations/${reservation_id}/seat`} role="button">Seat</a></td>
                                <td><button className="btn btn-secondary">Edit</button></td>
                                <td><button className="btn btn-secondary">Cancel</button></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ReservationList;