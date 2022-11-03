import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import TableHeader from "./TableHeader";
import TablesInfo from "../tables/TablesInfo";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ todaysDate }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [todaysDate]);

  const { search } = useLocation();
  const selectedDate = search.replace("?date=", "");
  todaysDate = selectedDate ? selectedDate : todaysDate;

  const reservationByDate = reservations.filter(
    (res) => res.reservation_date === todaysDate
  );

  async function loadDashboard() {
    try {
      const abortController = new AbortController();
      setError(null);
      setReservations(await listReservations(abortController.signal))
      setTables(await listTables(abortController.signal))

    return () => abortController.abort();
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h4>Reservations List:</h4>
        <ErrorAlert error={error} />
        <table>
          <TableHeader
            headers={[
              "id",
              "first name",
              "last name",
              "party size",
              "phone number",
              "date",
              "time",
              "status",
            ]}
          />
          <tbody>
            {reservationByDate.length
              ? reservationByDate.map((reservation) => {
                  if(reservation.status !== "finished"){
                    return (
                      <ReservationCard
                        reservation={reservation}
                        key={reservation.reservation_id}
                      />
                    );
                  }
                })
              : reservations.map((reservation) => {
                if(reservation.status !== "finished"){
                  return (
                    <ReservationCard
                      reservation={reservation}
                      key={reservation.reservation_id}
                    />
                  );
                }
                })}
          </tbody>
        </table>
      </div>

      <div>
        <h4>Tables List:</h4>
        <ErrorAlert error={error} />
        <table>
          <TableHeader
            headers={[
              "id",
              "table name",
              "capacity",
              "reservation id",
              "table status",
            ]}
          />
          <tbody>
            {tables.map((table) => (
              <TablesInfo
                table={table}
                setError={setError}
                loadDashboard={loadDashboard}
                setReservations={setReservations}
                key={table.table_id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
