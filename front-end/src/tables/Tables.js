import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";

export default function Tables({ data }) {
  return (
    <>
      <h1>Tables</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Vacancy</th>
            <th>Reservation ID</th>
          </tr>
        </thead>
      </table>
    </>
  );
}
