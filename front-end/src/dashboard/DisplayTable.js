import React from "react";
import { useParams } from "react-router-dom";

function DisplayTable({ table }) {
  const { reservation_id } = useParams();

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"> {table.table_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Capacity: {table.capacity}
          </h6>
          <p className="card-text" data-table-id-status={table.table_id}>
            Status: {table.reservation_id ? "Occupied" : "Free"}
          </p>
          {/* {reservation_id ? (
            <button className="btn btn-primary">Seat</button>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default DisplayTable;
