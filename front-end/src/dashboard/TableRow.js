import React from "react";

function TableRow({ rowData, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {rowData.last_name}, {rowData.first_name}
      </td>
      <td>{rowData.mobile_number}</td>
      <td>{rowData.reservation_date}</td>
      <td>{rowData.reservation_time}</td>
      <td>{rowData.people}</td>
      <td>pending</td>
      <td>
        <button type="button" class="btn btn-primary">
          Seat
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-secondary">
          Edit
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-secondary">
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
