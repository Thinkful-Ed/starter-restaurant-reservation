import React from "react";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/Submit";

function Table() {
  return (
    <div>
      <table>
        <tbody>
          <tr>
              <td>{}</td>
          </tr>
          <tr>
              <td>{}</td>
          </tr>
        </tbody>
      </table>
      <Cancel />
      <Submit />
    </div>
  );
}

export default Table;
