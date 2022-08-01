import React from "react";

export default function Tables({ tables }) {
  const listTables = () => {
    return tables.map((table, index) => {
      return (
        <tr key={index}>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td>{table.table_status || "vacant"}</td>
          <td>{table.reservation_id}</td>
          <td>
            <button className="btn btn-info">Finish</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1>Tables</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Vacancy</th>
            <th>Reservation ID</th>
            <th>Finish</th>
          </tr>
        </thead>
        <tbody>{tables && listTables()}</tbody>
      </table>
    </>
  );
}
