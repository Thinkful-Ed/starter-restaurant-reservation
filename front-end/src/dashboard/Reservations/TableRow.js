import React from "react";

function TableRow({ rowData, index }) {
  const handleSeatClick = () => console.log("seat");
  const handleEditClick = () => console.log("edit");
  const handleCancelClick = () => console.log("cancel");

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
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSeatClick}
        >
          Seat
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
