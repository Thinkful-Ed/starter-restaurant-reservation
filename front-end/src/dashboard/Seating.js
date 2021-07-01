import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import { seatReservation } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

const Seating = () => {


    const history = useHistory();

    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    const [formData, setFormData] = useState({
                                    table_id: ""
                                       })


    const { reservationId } = useParams(); 

    useEffect(loadTables, []);
  
  
    function loadTables() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    function handleChange({target}) {
        setFormData({
            [target.name]: target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const abortController = new AbortController();
        setTablesError(null);
        seatReservation(reservationId, formData.table_id, abortController.signal)
          .then(() => {
            history.push(`/dashboard`);
          })
          .catch(setTablesError);
        return () => abortController.abort();
    }

    function handleCancel() {
        history.goBack();
    }

    function listTablesByNumber(tables) {
        return (
            <div>
                <ErrorAlert error={tablesError}/>
                <select className="form-control" id="table_id" name="table_id" onChange={handleChange}>
                    <option>Select a Table...</option>
            {tables.map((table) => (
                <option name = {table.table_id} key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
        ))}
        </select>
        </div>
        )
    }

    
    return (         
        <div>
            <h1>Seat Reservations</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="table_id">Tables: </label>
            {listTablesByNumber(tables)}
           </div>
           <button type="submit" className="btn btn-primary">
            Submit
           </button>
           <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            </div>
     );
}
 
export default Seating;