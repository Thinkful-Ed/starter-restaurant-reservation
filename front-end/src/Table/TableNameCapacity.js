import React, {useState, useEffect} from "react"
import {listTables} from "../utils/api"

export default function TableNameCapacity(){
  const[tableNumber, setTableNumber] = useState([])

  useEffect(()=>{
    async function getListOfTables(){
      let listOfTables = await listTables();
      setTableNumber(listOfTables)
      // console.log("listOfTables: ", listOfTables)
    }
    getListOfTables();
  },[])
  // console.log("tableNumber: ", tableNumber)
  //console.log("table name",tableNumber[0].table_name)
  let theTablesList = tableNumber.map((table)=>{
    // console.log("table: ", table)
  return <option value={table.table_id} >{`${table.table_name} - ${table.capacity}`}</option>
  }
)
  return(
    <>
    {theTablesList}
    </>
  )
}