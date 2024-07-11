import React from "react";
import { freeTable } from "../utils/api";


function TablesTable({ tables, setTables, setErrorMessages }) {
  async function finishHandler(table_id) {
      if (window.confirm('Is this table ready to seat new guests? This cannot be undone.')) {
          const abortController = new AbortController();
          try {
              await freeTable(table_id, abortController.signal);
          
        // Updates the UI by setting the table with table_id to have reservation_id of null ,meaning the table is not occcupied, and setting the list of tables to now include that updated table
        const updatedTables = tables.map(table =>
            table.table_id === table_id ? { ...table, reservation_id: null } : table
        );
        setTables(updatedTables);
      } catch (error) {
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, error.message]);
      }
    }
  }


  const columnHeadingsForTablesTable = (
    <tr>
        <th scope="col">#</th>
        <th scope="col">Table Name</th>
        <th scope="col">Capacity</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th> {/* Explicit Actions column if finishing actions are possible */}
    </tr>
  );  

  const rowsForTablesTable = tables.map((table) => (
    <tr key={table.table_id}>
        <td>{table.table_id}</td> 
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
            {table.reservation_id ? "Occupied" : "Free"}
        </td>
        <td>
            {table.reservation_id && (
                <button
                    data-table-id-finish={table.table_id}
                    type="button"
                    className="btn btn-primary"
                    onClick={() => finishHandler(table.table_id)}
                >
                    Finish
                </button>
            )}
        </td>
    </tr>
  ));

return (
        <table className="table">
            <thead>
                {columnHeadingsForTablesTable}
            </thead>
            <tbody>
                {rowsForTablesTable}
            </tbody>
        </table>
    );
}

export default TablesTable;
