import React from "react";
import { getTableStatusBadgeVariant } from "../utils/helpers";

function TableList({ tables, handleFinish }) {
  return (
    <div className="container-fluid">
      <div className="row row-cols-4 pb-2 text-center">
        <div className="card-header bg-transparent border-0 p-0">
          Table Name
        </div>
        <div className="card-header bg-transparent border-0 p-0">Capacity</div>
        <div className="card-header bg-transparent border-0 p-0">
          Table Status
        </div>
        <div className="card-header bg-transparent border-0 p-0">Actions</div>
      </div>

      <ul className="list-group list-group-flush">
        {tables.map((table) => (
          <div className="card d-flex flex-column border-0 rounded-4 shadow-sm my-2">
            <div
              key={table.table_id}
              className="row row-cols-4 py-3 text-center"
            >
              <li className="list-group-item border-0 p-0 bg-transparent">
                {table.table_name}
              </li>
              <li className="list-group-item border-0 p-0 bg-transparent">
                {table.capacity}
              </li>
              <li className="list-group-item border-0 p-0 bg-transparent">
                <span
                  className={`badge ${getTableStatusBadgeVariant(
                    table.reservation_id
                  )}`}
                  data-table-id-status={table.table_id}
                >
                  {table.reservation_id ? "Occupied" : "Free"}
                </span>
              </li>
              <li className="list-group-item border-0 p-0 bg-transparent">
                {table.reservation_id !== null ? (
                  <button
                    type="button"
                    className="btn btn-outline-info btn-sm"
                    data-table-id-finish={table.table_id}
                    onClick={() =>
                      handleFinish(table.table_id, table.reservation_id)
                    }
                  >
                    Finish
                  </button>
                ) : null}
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TableList;
