import React from "react";
import {
  finishReservation
} from "../utils/api";

function TableDisplay({ table, loadDashboard}) {



    const {
        table_id,
        table_name,
        capacity,
        reservation_id,
    } = table;

    const finishHandler = async  (event) => {
      const confirm = window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      );
      if (confirm) {
        const ac = new AbortController();
        await finishReservation(table_id, ac.signal);
        await loadDashboard(ac.signal);
      }
    };

    return (
      <tr>
        <th scope="row">{table_id}</th>
        <td>
         {table_name}
        </td>
        <td>{capacity}</td>
        <td data-table-id-status={table_id}>{reservation_id ? "Occupied" : "Free"}</td>
        <td>
        {reservation_id ? 
        <button type="button" className="btn btn-info m-2" onClick={finishHandler} data-table-id-finish={table_id}>Finish</button>
         : ""}
         </td>
      </tr>
    );
  }

  export default TableDisplay;