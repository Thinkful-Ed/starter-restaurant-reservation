import { useState, useEffect } from "react";
import {useHistory, useParams} from "react-router-dom";
import {listTables} from "../utils/api";

function Seat() {
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);

    const {reservation_id} = useParams();

    const history = useHistory();

    function loadTables() {
        const ac = new AbortController();
        listTables(ac.signal)
            .then(setTables)
            .catch(setError);
        return () => ac.abort();
    }

    useEffect(loadTables, []);
    
    let tableSelect = tables.map(table => (
       <option value={table.table_name}>{table.table_name} - {table.capacity}</option> 
    ))

    return (
    <div>
        <select className="form-select" name="table_id">
            {tables.length && tableSelect}
        </select>
        <button className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
        <button className="btn btn-primary">Submit</button>
    </div>
    )
}

export default Seat;