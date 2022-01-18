import { listTables } from "../utils/api";
import {useState, useEffect} from "react";
import ErrorAlert from "../layout/ErrorAlert";

function TableList() {
    const [tables, setTables] = useState([])
    const [tablesError, setTablesError] = useState(null);

    useEffect(loadTables, [])

    function loadTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
            .then(setTables)
            .catch(setTablesError);
            return () => abortController.abort();
    }

    let display = tables.map(table => {
        return (
            <tr>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td>{table.reservation_id ? "Occupied" : "Free"}</td>
            </tr>
        )
    });
    return (
        <div>
            <ErrorAlert error={tablesError} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Table</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Occupied</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
        </div>
    )
}

export default TableList;