import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function Dashboard() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const date = query.get("date") || today();

    useEffect(() => {
        const abortController = new AbortController();
        setError(null); // Reset error state
        listReservations({ date }, abortController.signal)
            .then(reservations => setReservations(reservations.sort((a, b) => a.reservation_time.localeCompare(b.reservation_time))))
            .catch(setError);
        return () => abortController.abort();
    }, [date]);

    const navigateTo = (newDate) => {
        history.push(`/dashboard?date=${newDate}`);
    };

    const handleNextDay = () => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + 1);
        navigateTo(currentDate.toISOString().slice(0, 10));
    };

    const handlePreviousDay = () => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() - 1);
        navigateTo(currentDate.toISOString().slice(0, 10));
    };

    const handleToday = () => {
        navigateTo(today());
    };

    return (
      <main>
          <h1>Dashboard</h1>
          <div className="d-md-flex mb-3">
              <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <ErrorAlert error={error} />
          {reservations.map((reservation, index) => (
              <div key={index} className="reservation-card">
                  <p>First Name: {reservation.first_name}</p>
                  <p>Last Name: {reservation.last_name}</p>
                  <p>Mobile Number: {reservation.mobile_number}</p>
                  <p>Date of Reservation: {reservation.reservation_date}</p>
                  <p>Time of Reservation: {reservation.reservation_time}</p>
                  <p>Number of People: {reservation.people}</p>
                  {/* more reservation details if needed */}
              </div>
          ))}
          <div className="date-navigation">
              <button onClick={handlePreviousDay} className="btn btn-secondary">Previous</button>
              <button onClick={handleToday} className="btn btn-primary">Today</button>
              <button onClick={handleNextDay} className="btn btn-secondary">Next</button>
          </div>
      </main>
  );
}

export default Dashboard;
