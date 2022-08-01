import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {listTables, deleteTableAssignment} from "../utils/api";


export default function TableList(){
  const {table_id} = useParams();
  const[data, setData] = useState([]);

  const clickHandler = async (table_id) => {
    const markAsFinished = window.confirm(`Is this table ready to seat new guests? This cannot be undone.`)
    if(markAsFinished){
      async function requestToDeleteTableAssignment(){
        await deleteTableAssignment(table_id)
        window.location.reload()
      }
      requestToDeleteTableAssignment();
    }
  }

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
    {table.reservation_id && <button data-table-id-finish={table.table_id} onClick={()=>clickHandler(table.table_id)}>Finish</button>}
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