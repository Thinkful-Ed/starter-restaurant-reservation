import React, { useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { finishTableReservation, updateReservationStatus, listReservations } from '../utils/api';

function TablesInfo({table, setError, loadDashboard, setReservations, key}) {
    const [currentTable, setCurrentTable] = useState(table)
    const history = useHistory()
    
    const handleFinishTable = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        setError(null)
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            Promise.all([
                updateReservationStatus(
                    "finished", 
                    currentTable.reservation_id, 
                    abortController.signal)
                    .catch(setError),
                finishTableReservation(event.target.value, abortController.signal)
                    .then(setCurrentTable)
                    .then(()=> history.push("/"))
                    .catch(setError)
            ])
        }
        return () => abortController.abort()
    }
    return ( 
        <tr key={key}>
            <td>{currentTable.table_id}</td>
            <td>{currentTable.table_name}</td>
            <td>{currentTable.capacity}</td>
            <td>{currentTable.reservation_id}</td>
            <td data-table-id-status={`${table.table_id}`}>{currentTable.table_status}</td>
            <td>
                {currentTable.reservation_id ? 
                <button
                    type='submit'
                    onClick={handleFinishTable}
                    data-table-id-finish={`${table.table_id}`}
                    value={table.table_id}
                >
                    Finish
                </button> 
                : 
                <></>}
            </td>
        </tr>
     );
}

export default TablesInfo;