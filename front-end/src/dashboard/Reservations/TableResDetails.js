import React from "react";
import TableRow from "./TableRow";

function TableResDetails({ reservations, date, loadDashboard }) {
  //loop over reservations
  //with each index, render TableRow component(which is only one row of data)
  const rows = reservations.map((reservation) => (
    <TableRow
      reservation={reservation}
      loadDashboard={loadDashboard}
      key={reservation.reservation_id}
    />
  ));

  return (
    <React.Fragment>
      <table className="tableResDetails table">
        <thead>
          <tr className="reservations-categories-row">
            <th className="border-top-0">#</th>
            <th className="border-top-0">Name</th>
            <th className="border-top-0">Phone</th>
            <th className="border-top-0">Date</th>
            <th className="border-top-0">Time</th>
            <th className="border-top-0">People</th>
            <th className="border-top-0">Status</th>
          </tr>
        </thead>
        <tbody className="reservations-body">{rows}</tbody>
      </table>
    </React.Fragment>
  );
}

export default TableResDetails;
