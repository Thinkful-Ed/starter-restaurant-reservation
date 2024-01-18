import React from "react";

function TableList({ tables }) {
  const tablesMap = tables.map((table) => (
    <tr key={table.table_id}>
      <td className="align-middle">{table.table_name}</td>
      <td className="align-middle">{table.capacity}</td>
      <td className="align-middle" data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
    </tr>
  ));

  return (
    <div className="table-hover">
      <div className="d-md-flex mb-3">
        <h4 className="mb-0 pt-3 mx-auto text-center">Tables</h4>
      </div>
      <table className="table text-center table-sm">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Table Status</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">{tablesMap}</tbody>
      </table>
    </div>
  );
}

export default TableList;
