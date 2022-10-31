import React from "react";
import TableRow from "./TableRow";

function TableList({ tables, loadDashboard }) {
  const rows = tables.map((rowData, index) => (
    <TableRow rowData={rowData} index={index} />
  ));
  return (
    <div>
      <table className="tablesList table">
        <thead>
          <tr>
            <th className="border-top-0">#</th>
            <th className="border-top-0">Table Name</th>
            <th className="border-top-0">Capacity</th>
            <th className="border-top-0">Status</th>
            <th className="border-top-0">Finish</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default TableList;
