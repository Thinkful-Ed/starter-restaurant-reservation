import React, {useState, useEffect} from "react";
import { listTables } from "../utils/api";
import SeatForm from "./SeatForm";

function Seat() {
    const [Tables, setTables] = useState([]);
    const [TablesError, setTablesError] = useState(null);
  
    useEffect(loadDashboard, []);
  
    function loadDashboard() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    return <div>
        <h3>Seat a Reservation</h3>
        <SeatForm tables={Tables}/>
    </div>
}

export default Seat