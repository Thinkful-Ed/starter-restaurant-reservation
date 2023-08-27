import React, { useEffect, useState } from 'react';
import { listReservations, listTables, finishTable } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import { previous, next, today } from '../utils/date-time';
import { useHistory } from 'react-router-dom';
import ReservationsList from './ReservationsList';
import TablesList from './TablesList';
import { updateReservationStatus } from '../utils/api';

export default function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const queryDate = query.get('date');
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [finishError, setFinishError] = useState(null);
  const [cancelError, setCancelError] = useState(null);

  async function fetchData() {
    const abortControllerR = new AbortController();
    const abortControllerT = new AbortController();

    setReservationsError(null);
    setTablesError(null);

    try {
      const reservationsData = await listReservations(
        { date: queryDate || today() },
        abortControllerR.signal
      );
      setReservations(reservationsData);

      const tablesData = await listTables(abortControllerT.signal);
      setTables(tablesData);
    } catch (error) {
      setReservationsError(error);
      setTablesError(error);
    }

    return () => {
      abortControllerR.abort();
      abortControllerT.abort();
    }
  }

  useEffect(() => {
    fetchData();
  }, [queryDate]);

  async function handleCancel(reservationId) {
    if (
      window.confirm(
        'Do you want to cancel this reservation? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      const cancelled = 'cancelled';
      try {
        await updateReservationStatus(
          reservationId,
          cancelled,
          abortController.signal
        );
        fetchData();
      } catch (error) {
        setCancelError(error);
      }
    }
  }

  async function handleFinish(event) {
    const tableId = event.target.getAttribute('data-table-id-finish');

    if (
      window.confirm(
        'Is this table ready to seat new guests? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      try {
        await finishTable(tableId, abortController.signal);
        fetchData();
      } catch (error) {
        setFinishError(error);
      }
    }
  }

  const handlePrevious = (event) => {
    event.preventDefault();
    const formattedPreviousDate = previous(date);
    console.log('Formatted Previous Date:', formattedPreviousDate); // Debugging
    history.push(`/dashboard?date=${formattedPreviousDate}`);
  };
  
  const handleNext = (event) => {
    event.preventDefault();
    const formattedNextDate = next(date);
    console.log('Formatted Next Date:', formattedNextDate); // Debugging
    history.push(`/dashboard?date=${formattedNextDate}`);
  };

  const handleToday = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  };

  return (
    <main>
      <div className="text-center">
        <h1>Dashboard</h1>
        <div className="panel panel-default">
          <div>
            <div className="btn-group w-50">
              <button
                className="btn btn-secondary w-100"
                onClick={handlePrevious}
              >
                Previous
              </button>

              <button className="btn btn-success w-100" onClick={handleToday}>
                Today
              </button>

              <button className="btn btn-secondary w-100" onClick={handleNext}>
                Next
              </button>
            </div>
            <div className="panel-heading p-3">
              <h4>Reservations for {queryDate || today()}</h4>
            </div>
          </div>
          <div className="panel-body">
            <ReservationsList
              reservations={reservations}
              date={queryDate || today()}
              mobile_number={query.get('mobile_number')}
              handleCancel={handleCancel}
            />
            <TablesList tables={tables} handleFinish={handleFinish} />
          </div>
        </div>
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
        <ErrorAlert error={finishError} />
        <ErrorAlert error={cancelError} />
      </div>
    </main>
  );
}
