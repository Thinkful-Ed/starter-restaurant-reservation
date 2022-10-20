import React from "react";

function TableResDetails() {
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
        <tbody>
          <tr>
            <td>6</td>
            <td>"Alyssa"</td>
            <td>1235232</td>
            <td>2022-10-01</td>
            <td>12:00:00</td>
            <td>1</td>
            <td>pending</td>
            <td>
              <button type="button" class="btn btn-primary">
                Primary
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default TableResDetails;
