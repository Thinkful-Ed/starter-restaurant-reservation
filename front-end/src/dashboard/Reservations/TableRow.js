import React from "react";

function TableRow({ rowData, index }) {
  // const handleSeatClick = () => console.log("seat");
  const handleEditClick = () => console.log("edit");
  const handleCancelClick = () => console.log("cancel");

  //The "Seat" button must be a link with an href attribute that equals /reservations/${reservation_id}/seat, so it can be found by the tests.

  return (
    <tr>
      <td>{rowData.reservation_id}</td>
      <td>
        {rowData.last_name}, {rowData.first_name}
      </td>
      <td>{rowData.mobile_number}</td>
      <td>{rowData.reservation_date}</td>
      <td>{rowData.reservation_time}</td>
      <td>{rowData.people}</td>
      <td>pending</td>
      <td>
        <a
          className="btn btn-primary"
          role="button"
          href={`/reservations/${rowData.reservation_id}/seat`}
        >
          Seat
        </a>

        {/* <button
          type="button"
          className="btn btn-primary"
          onClick={handleSeatClick}
        >
          Seat
        </button> */}
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
