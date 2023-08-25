import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { listTables, seatReservation } from '../utils/api';


export default function SeatReservation() {
	const [tables, setTables] = useState([]);
	const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const history = useHistory();
  const reservation_id = useParams().reservation_id;

  useEffect(()=>{
    async function loadTables(){
      const abortController = new AbortController();
      try{
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch(error){
        setError(error);
      }
    }
    loadTables();
  }
  ,[]);





  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try{
      await seatReservation(reservation_id, selectedTable, abortController.signal);
      history.push(`/dashboard`);
    } catch(error){
      setError(error);
    }

  }

//The "Free" or "Occupied" text must have a `data-table-id-status=${table.table_id}` attribute
	return (
		<div>
			<h2>Seat Reservation</h2>
			<label htmlFor="table_id">Table Number:</label>
			<select 
      name="table_id" 
      id="table_id"
      value={selectedTable}
      onChange={(event)=>setSelectedTable(event.target.value)}
      >
				<option value={null}>Select a table</option>
				{tables.map((table) => (
					<option key={table.table_id} value={table.table_id}>
						{table.table_name} - {table.capacity}
					</option>
				))}
			</select>
      <div>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      <ErrorAlert error={error} />
      <button className="btn btn-danger" onClick={history.goBack}>Cancel</button>
      </div>
		</div>
	);
}
