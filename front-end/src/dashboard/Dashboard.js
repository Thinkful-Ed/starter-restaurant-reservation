import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time"
import { Link } from "react-router-dom";
import TableList from "../Table/TableList"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);


  useEffect(loadDashboard, [date]);

  function loadDashboard() {

    // const dateThatIsOnPage = date;
    // const previousDate = previous(dateThatIsOnPage);
    // console.log("dateThatIsOnPage", dateThatIsOnPage)
    // console.log("previousDate", previousDate)

    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
        <Link to={`/dashboard?date=${previous(date)}`}><button>Previous</button></Link>
        <Link to ={`/dashboard`}><button>Today</button></Link>
        <Link to ={`/dashboard?date=${next(date)}`}><button>Next</button></Link>
      </div>
      <ErrorAlert error={reservationsError} />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>People</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {reservations.map((reservation) => {
          //reservation is seated when a table has it's reservation id otherwise it is booked
          //if table_id has reservation id then reservation.status= seated else reservation.status = booked
        return (<tr key={reservation.reservation_id}>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
          <td>
            {reservation.status === "Booked" &&<Link to={`/reservations/${reservation.reservation_id}/seat`}><button>Seat</button></Link>}
          </td>
        </tr>)
      })}
        </tbody>
      </table>
      <TableList/>
    </main>
  );
}

export default Dashboard;
