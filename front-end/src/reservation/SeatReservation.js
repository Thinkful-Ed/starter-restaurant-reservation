import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { listTables, seatReservation } from '../utils/api';

export default function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (error) {
        setError(error);
      }
    }
    loadTables();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatReservation(
        reservation_id,
        selectedTable,
        abortController.signal
      );
      history.push(`/dashboard`);
    } catch (error) {
      setError(error);
    }
  }

  return (
		<div className='d-flex justify-content-center text-center'>
    <div className="panel panel-default w-25">
      <div className="panel-heading">
        <h2 className="panel-title">Seat Reservation</h2>
      </div>
      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="table_id">Table Number:</label>
            <select
              className="form-control"
              name="table_id"
              id="table_id"
              value={selectedTable}
              onChange={(event) => setSelectedTable(event.target.value)}
            >
              <option value={null}>Select a table</option>
              {tables.map((table) => (
                <option key={table.table_id} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button className="btn btn-danger" onClick={history.goBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ErrorAlert error={error} />
    </div>
		</div>
  );
}
