import React from "react";
import axios from "axios";

export default function TableCard({ table, setTables }) {
  const URL = process.env.REACT_APP_API_BASE_URL;

  const handleFinishClick = async (event) => {
    event.preventDefault();
    const message = `Is this table ready to seat new guests? This cannot be undone.`;

    if (window.confirm(message)) {
      try {
        await axios.delete(`${URL}/tables/${table.table_id}/seat`);
        setTables(function (oldTables) {
          const newTables = [...oldTables];
          const tableToUpdate = newTables.find((tableToFind) => {
            return tableToFind.table_id === table.table_id;
          });
          tableToUpdate.status = "free";
          return newTables;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <tr>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{table.status}</td>
      <td>
        {table.status === "occupied" && (
          <button
            data-table-id-finish={table.table_id}
            className="btn btn-primary"
            onClick={handleFinishClick}
          >
            Finish
          </button>
        )}
      </td>
    </tr>
  );
}
