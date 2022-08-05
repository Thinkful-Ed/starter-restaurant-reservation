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
            <th scope="col">Table Id</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Free?</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{theTablesList}</tbody>
      </table>
    </div>
  );
}
