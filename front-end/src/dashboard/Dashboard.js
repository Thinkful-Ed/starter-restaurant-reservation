import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReservationTable } from '../components/ReservationTable';
import { TableList } from '../components/tables/TableList';
import ErrorAlert from '../layout/ErrorAlert';
import {
  finishTable,
  listReservations,
  listTables,
  updateStatus,
} from '../utils/api';
import { next, previous, today } from '../utils/date-time';
import './dashboard.css';
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const filterResults = true;

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables().then(setTables);

    return () => abortController.abort();
  }

  async function handleFinish(table_id) {
    const abortController = new AbortController();
    const confirm = window.confirm(
      'Table ready to seat new guests? This cannot be undone.'
    );

    if (confirm) {
      await finishTable(table_id, abortController.signal);
      loadDashboard();
    }

    return () => abortController.abort();
  }

  const handleCancel = async (event) => {
    const result = window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    );

    if (result) {
      await updateStatus(event.target.value, 'cancelled');
      loadDashboard();
    }
  };

  return (
    <main>
      <ErrorAlert error={reservationsError} />
      <div>
        <div>
          <div>
            <div>
              <h2 className='header-dashboard'>
                Reservations for {moment(date).format('dddd MMM DD YYYY')}
              </h2>
            </div>
            <div className='item centered'>
              <div className='group-row'>
                <button
                  className='item black dashboard-button'
                  onClick={() =>
                    history.push(`/dashboard?date=${previous(date)}`)
                  }
                >
                  Previous
                </button>
                <button
                  className='item black dashboard-button-center'
                  onClick={() => history.push(`/dashboard?date=${today()}`)}
                >
                  Today
                </button>
                <button
                  className='item black dashboard-button'
                  onClick={() => history.push(`/dashboard?date=${next(date)}`)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <div id='reservations'>
            <ReservationTable
              reservations={reservations}
              filterResults={filterResults}
              handleCancel={handleCancel}
            />
          </div>
        </div>
        <div id='tables'>
          <h2 className='dashboard-tables'>Tables</h2>
          <hr></hr>
          <TableList table={tables} handleFinish={handleFinish} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
