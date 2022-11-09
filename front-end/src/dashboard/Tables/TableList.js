import React from "react";
import TableRow from "./TableRow";

function TableList({ tables, loadDashboard }) {
  const rows = tables.map((table, index) => (
    <TableRow
      table={table}
      loadDashboard={loadDashboard}
      key={table.table_id}
    />
  ));
  return (
    <div>
      <table className="tablesList table">
        <thead>
          <tr className="tables-categories-row">
            <th className="border-top-0">#</th>
            <th className="border-top-0">Table Name</th>
            <th className="border-top-0">Capacity</th>
            <th className="border-top-0">Status</th>
            <th className="border-top-0">Finish</th>
          </tr>
        </thead>
        <tbody className="tables-body">{rows}</tbody>
      </table>
    </div>
  );
}

export default TableList;
