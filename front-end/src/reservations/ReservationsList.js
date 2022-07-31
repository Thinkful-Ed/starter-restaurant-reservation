import React from "react";
import { Link, useHistory } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";

export default function ReservationsList({ date, reservations }) {
  const history = useHistory();

  const reservationsList = () => {
    if (reservations.length < 1) {
      return (
        <>
          <p>There are no reservations for this date.</p>
        </>
      );
    }

    const list = reservations.map((reservation) => {
      return (
        <tr key={reservation.reservation_id}>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td>
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-secondary">Seat</button>
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <table className="table mt-3">
        <thead>
          <tr key={date}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Give Table</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    );
  };

  // changes rendered reservations based on date
  const previousHandler = () => {
    history.push(`/dashboard?date=${previous(date)}`);
  };

  const todayHandler = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  const nextHandler = () => {
    history.push(`/dashboard?date=${next(date)}`);
  };
  return (
    <>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <button className="btn btn-primary mr-1" onClick={previousHandler}>
        Previous
      </button>
      <button className="btn btn-secondary mr-1" onClick={todayHandler}>
        Today
      </button>
      <button className="btn btn-info" onClick={nextHandler}>
        Next
      </button>
      {reservations && reservationsList()}
    </>
  );
}
