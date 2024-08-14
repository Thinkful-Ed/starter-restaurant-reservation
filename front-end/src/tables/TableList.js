import React from "react";
import { getTableStatusBadgeVariant } from "../utils/helpers";

function TableList({ tables, handleFinish }) {
  return (
    <div className="container-fluid">
      <div className="row row-cols-4 pb-2 px-2 px-md-0 text-center">
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
          <div className="card d-flex flex-column border-0 rounded-4 shadow-sm my-2 px-2 px-md-0">
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
        <div className="card d-flex rounded-4 shadow-sm my-2 dotted-border bg-transparent new-res-card">
          <div className="d-flex flex-column py-3 align-items-center">
            <div>
              <a href="/tables/new" type="button" className="btn add-new-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.5.5 0 0 0-.5.5v3H4a.5.5 0 0 0 0 1h3.5v3a.5.5 0 0 0 1 0v-3H12a.5.5 0 0 0 0-1H8.5v-3A.5.5 0 0 0 8 4z" />
                </svg>
              </a>
            </div>
            <p className="card-text text-center">Add a New Table</p>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default TableList;
