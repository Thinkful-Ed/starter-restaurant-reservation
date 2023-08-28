import React from "react";

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
function Dashboard({ date, reservations, reservationsError, loadDashboard, tables }) {
  const history = useHistory();

  
  const reservationsJSX = () => {
    return reservations.map((reservation) => (
      <ReservationRow
        key={reservation.reservation_id}
        reservation={reservation}
        loadDashboard={loadDashboard}
      />
    ));
  };

  function tableRow() {
    return tables.map((table) => {
      <TableRow
        key={table.table_id}
        table={table}
        loadDashboard={loadDashboard}
      />
    })
  }

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
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
        
      </div>
      <ErrorAlert error={reservationsError} />
      
      <table className="reservations">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Edit</th>
            <th>Cancel</th>
            <th>Seat</th>
          </tr>
        </thead>

        <tbody>
          {reservations.length ? (
            reservationsJSX()
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
              <td>--</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button
          className="prevButton"
          type="button"
          name="previous"
          onClick={handleClick}
        >Previous</button>
        <button
          className="todayButton"
          type="button"
          name="today"
          onClick={handleClick}
        >Today</button>
        <button
          className="nextButton"
          type="button"
          name="tomorrow"
          onClick={handleClick}
        >Next</button>
      </div>
      <div>
        <h4>Tables</h4>

        <table>
          <thead>
            <tr>
              <th>Table Name</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tables.length ? (
              tableRow() ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
