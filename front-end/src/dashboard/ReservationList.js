import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function ReservationList({ reservations, date }) {

    const history = useHistory();

    console.log("component", reservations);
    return (
        <div className="container">
            <div className="row">
                <div className="column col-md-6">
                    <div className="row">
                        <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
                        <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
                        <button className="btn btn-secondary reservationNav" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
                    </div>
                    <div className="row">
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
                                        return (<tr key={reservation.reservation_id}>
                                            <td>{reservation.reservation_id}</td>
                                            <td>{`${reservation.first_name}, ${reservation.last_name}`}</td>
                                            <td>{reservation.mobile_number}</td>
                                            <td>{reservation.reservation_date}</td>
                                            <td>{reservation.reservation_time}</td>
                                            <td>{reservation.people}</td>
                                            <td>booked</td>
                                            <td><button className="btn btn-secondary">Seat</button></td>
                                            <td><button className="btn btn-secondary">Edit</button></td>
                                            <td><button className="btn btn-secondary">Cancel</button></td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className="column col-md-6">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TABLE NAME</th>
                                <th>CAPACITY</th>
                                <th>FREE?</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ReservationList;