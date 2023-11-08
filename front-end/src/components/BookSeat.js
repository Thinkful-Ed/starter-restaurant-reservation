import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  listReservations,
  listTables,
  readReservation,
  updateTable,
} from '../utils/api';

export const BookSeat = () => {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState('');
  const [reservation, setReservation] = useState({});

  const history = useHistory();

  useEffect(() => {
    listTables().then(setTables);
  }, []);

  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  const changeHandler = (event) => {
    setTableId(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    await updateTable(reservation.reservation_id, tableId);
    history.push('/dashboard');
  };

  return (
    <div>
      <h2 className='header-dashboard'>Seat Reservation</h2>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <select
              id='table_id'
              name='table_id'
              value={tableId}
              required={true}
              onChange={changeHandler}
            >
              <option value=''>- Select a table -</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={
                    table.capacity < reservation.people || table.occupied
                  }
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className='group-row'>
            <button
              className='black'
              type='button'
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button className='yellow' type='submit'>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
