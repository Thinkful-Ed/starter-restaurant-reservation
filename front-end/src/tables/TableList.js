import React from "react";
import { getTableStatusBadgeVariant } from "../utils/helpers";

function TableList({ tables, handleFinish }) {
  const tablesMap = tables.map((table) => (
    <tr key={table.table_id}>
      <td className="align-middle">{table.table_name}</td>
      <td className="align-middle">{table.capacity}</td>
      <td className="align-middle">
        <span
          className={`badge ${getTableStatusBadgeVariant(
            table.reservation_id
          )}`}
          data-table-id-status={table.table_id}
        >
          {table.reservation_id ? "Occupied" : "Free"}
        </span>
      </td>
      <td className="align-middle">
        {table.reservation_id !== null ? (
          <button
            type="button"
            className="btn btn-outline-info btn-sm align-middle"
            data-table-id-finish={table.table_id}
            onClick={() => handleFinish(table.table_id, table.reservation_id)}
          >
            Finish
          </button>
        ) : (
          <> {null} </>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="table-responsive table-hover">
      <table className="table text-center table-sm border bg-light">
        <thead>
          <tr>
            <th scope="col align-middle">Table Name</th>
            <th scope="col align-middle">Capacity</th>
            <th scope="col align-middle">Table Status</th>
            <th scope="col align-middle"></th>
          </tr>
        </thead>

        <tbody className="table-group-divider">{tablesMap}</tbody>
      </table>
    </div>
  );
}

export default TableList;
