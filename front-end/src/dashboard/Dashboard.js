import React from "react";
import "./Dashboard.css"
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationRow from "../reservations/ReservationRow";
import { useHistory } from "react-router-dom";
import TableRow from "../Tables/TableRow";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, reservationsError, loadDashboard, tables, tablesError }) {
  const history = useHistory();

  
  const reservationsRow = () => {
    return reservations.map((reservation) => (
      <ReservationRow
        key={reservation.reservation_id}
        reservation={reservation}
        loadDashboard={loadDashboard}
      />
    ));
  };

  const tablesRow = () => {
    return tables.map((table) => (
      <TableRow
        key={table.table_id}
        table={table}
        loadDashboard={loadDashboard}
      />
    ))
  };

  function handleClick({target}) {
    
    let useDate
    let newDate

    //if date is falsey or undefined use current date
    if (!date) {
      useDate = today();
    } else {
      useDate = date
    }

    if (target.name === "previous") {
      newDate = previous(useDate);
    } else if (target.name === "tomorrow") {
      newDate = next(useDate);
    } else {
      newDate = today();
    }

    history.push(`/dashboard?date=${newDate}`);
  }


  return (
    <main className="dashboard container">
      
      <section className="reservations-section">
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="dateButtons">
        <button
          className="prevButton btn btn-secondary"
          type="button"
          name="previous"
          onClick={handleClick}
        >Previous</button>
        <button
          className="todayButton btn btn-primary"
          type="button"
          name="today"
          onClick={handleClick}
        >Today</button>
        <button
          className="nextButton btn btn-secondary"
          type="button"
          name="tomorrow"
          onClick={handleClick}
        >Next</button>
      </div>
      <div className="reservationTable">
      <table className="reservations table">
        <thead>
          <tr>
            <th scope="col">Reservation ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col"> Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>

        <tbody>
          {reservations.length ? (
            reservationsRow()
          ) : (
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </section>
      <section className="tablesTable">
      <div>
      <h4>Tables</h4>
      </div>
        <table className="tables table">
          <thead>
            <tr>
              <th scope="col">Table ID</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col">Reservation ID</th>
              <th scope="col">Finish</th>
            </tr>
          </thead>

          <tbody>
            {tables.length ? (
              tablesRow()
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Dashboard;
