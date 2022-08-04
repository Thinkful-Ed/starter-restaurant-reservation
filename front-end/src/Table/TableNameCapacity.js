import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";

export default function TableNameCapacity() {
  const [tableNumber, setTableNumber] = useState([]);

  useEffect(() => {
    async function getListOfTables() {
      let listOfTables = await listTables();
      setTableNumber(listOfTables);
    }
    getListOfTables();
  }, []);

  let theTablesList = tableNumber.map((table) => {
    return (
      <option
        key={table.table_id}
        value={table.table_id}
      >{`${table.table_name} - ${table.capacity}`}</option>
    );
  });
  return <>{theTablesList}</>;
}
