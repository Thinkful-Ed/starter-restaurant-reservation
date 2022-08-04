import React, { useState, useEffect } from "react";

import { listTables, deleteTableAssignment } from "../utils/api";

export default function TableList() {
  const [data, setData] = useState([]);
  const ac = new AbortController();

  const clickHandler = async (table_id) => {
    const markAsFinished = window.confirm(
      `Is this table ready to seat new guests? This cannot be undone.`
    );
    if (markAsFinished) {
      async function requestToDeleteTableAssignment() {
        await deleteTableAssignment(table_id, ac.signal);
        window.location.reload();
      }
      requestToDeleteTableAssignment();
      return () => ac.signal();
    }
  };

  useEffect(() => {
    async function theTable() {
      let result = await listTables();
      setData(result);
    }
    theTable();
  }, []);

  let theTablesList = data.map((table) => (
    <tr key={table.table_id}>
      <td scope="col">{table.table_id}</td>
      <td scope="col">{table.table_name}</td>
      <td scope="col">{table.capacity}</td>
      <td data-table-id-status={table.table_id} scope="col">
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td scope="col">
        {table.reservation_id && (
          <button
            data-table-id-finish={table.table_id}
            onClick={() => clickHandler(table.table_id)}
          >
            Finish
          </button>
        )}
      </td>
    </tr>
  ));
  return (
    <div className="table-responsive">
      <h1>table name list</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Table Id</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Free?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{theTablesList}</tbody>
      </table>
    </div>
  );
}
