import React from "react";

function TablesList({tables}) {
    const rows = tables.map(({table_name, table_id, capacity, reservation_id}, index) => (
        <tr key={index}>
          <td>{table_name}</td>
          <td>{capacity}</td>
          <td>{reservation_id ? "Occupied" : "Free"}</td>
          <td>{reservation_id ? <button type="submit" className="btn btn-primary" onClick={handleSubmit} data-table-id-finish={table_id}> Finish </button> : null}</td>
        </tr>
    ));
    return (
        <div className="reservations-list">
          <table>
            <thead>
              <tr>
                <th>Table Name</th>
                <th>Capacity</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
          </table>
        </div>
      );
}

export default TablesList;