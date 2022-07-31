import React, {useState, useEffect} from "react";
import {listTables} from "../utils/api"


export default function TableList(){
  const[data, setData] = useState([])

  useEffect(()=>{
    async function theTable(){
      let result = await listTables();
      console.log("result", result);
      setData(result)
    }
    theTable();
  },[])

  let theTablesList = data.map((table)=> <tr>
    <td>{table.table_id}</td>
    <td>{table.table_name}</td>
    <td>{table.capacity}</td>
    <td  data-table-id-status={table.table_id}>{table.reservation_id ?"Occupied":"Free"}</td>
    </tr>)
  return(
    <>
    <h1>table name list</h1>
    <table>
        <thead>
          <tr>
            <th>Table Id</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Free?</th>
          </tr>
        </thead>
        <tbody>
          {theTablesList}
        </tbody>
    </table>
    </>
  )

}