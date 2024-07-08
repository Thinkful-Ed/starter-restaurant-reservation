import React from "react";

function TablesTable({ tables, handleFinish }) {  


  async function handleFinish(table_id) {
    if (
      window.confirm(
        'Is this table ready to seat new guests? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      try {
        await freeTable(table_id, abortController.signal);
        window.location.reload();
      } catch (error) {
        setTablesError(error);
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
            {table.reservation_id ? 'Occupied' : 'Free'}
        </td>
        <td>
            {table.reservation_id && (
                <button
                    data-table-id-finish={table.table_id}
                    type='button'
                    className='btn btn-primary'
                    onClick={() => handleFinish(table.table_id)}
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
