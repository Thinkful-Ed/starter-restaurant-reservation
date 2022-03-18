import React from 'react'
import {useHistory} from "react-router-dom"
import { clearTable } from '../../utils/api';

function TablesTable({tables}) {
    const history = useHistory()
    const handleClear = (table_id)=>{
        if (
            window.confirm(
              "Is this table ready to seat new guests? This cannot be undone."
            )
          ) {
            const AC = new AbortController();
            clearTable(table_id, AC.signal).then(()=>history.push("/")).catch((e)=>console.log(e.message));
            return () => AC.abort();
          }

    }
    const tablesRows = tables.map(({reservation_id, table_id,capacity, table_name})=>{
        return(
            <tr key={table_id}>
                <th scope="row">{table_name}</th>
            <td>{capacity}</td>
            <td data-table-id-status={table_id}>{reservation_id?"Occupied":"Free"}</td>
            <td>{reservation_id&&<button onClick={()=>handleClear(table_id)} type="button" className="btn btn-dark" data-table-id-finish={table_id}>Finish</button>}</td>
            </tr>
        )
    })
    return (
        <table className="table">
        <thead className="thead-light">
            <tr>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Vaccant ?</th>
            <th scope="col">Done</th>
            </tr>
        </thead>
        <tbody>
            {tablesRows}
        </tbody>
        </table>
    )
}

export default TablesTable