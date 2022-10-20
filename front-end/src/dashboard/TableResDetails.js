import React from "react";
import TableRow from "./TableRow";

function TableResDetails({ reservations }) {
  //loop over reservations
  //with each index, render TableRow component(which is only one row of data)
  const rows = reservations.map((rowData, index) => (
    <TableRow rowData={rowData} index={index} />
  ));

  return (
    <React.Fragment>
      <table class="table">
        <thead>
          <tr>
            <th class="border-top-0">#</th>
            <th class="border-top-0">Name</th>
            <th class="border-top-0">Phone</th>
            <th class="border-top-0">Date</th>
            <th class="border-top-0">Time</th>
            <th class="border-top-0">People</th>
            <th class="border-top-0">Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </React.Fragment>
  );
}

export default TableResDetails;
