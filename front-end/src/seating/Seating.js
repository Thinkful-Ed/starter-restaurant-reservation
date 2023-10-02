import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useParams } from "react-router-dom/cjs/react-router-dom";

function Seating() {
    const { reservation_id } = useParams();//PARAMETER FROM URL
    const reservation_number = Number(reservation_id)
    const [tables, setTables] = useState(null)
    const [table, setTable] = useState(null)
    const initFormState = {
        "table_name": "",
        "capacity": "",
        "status": "Occupied",
        "reservation_id": reservation_number
    }    
    const [form, setForm] = useState(initFormState)

    const history = useHistory();
    const cancelHandler = (e) => {
        e.preventDefault()
        history.goBack()
    }
    useEffect(()=> {
        async function getTables() {
          try {
            const response = await fetch(
            'http://localhost:5001/tables',
            {
              method: "GET",
              body: JSON.stringify(),
              headers : {
                "Content-type": "application/json;charset=UTF-8"
              }
            }
          );
          const tables = await response.json();
          setTables(tables)
          } catch (error) {
            console.error("Error: ", error)
          }
        }
        getTables()
      },[])
    /**
     * every time you change the option in the select element
     * use FIND method to find table based on the option table_id
     * save retrieved table in a state variable
     */
    const changeHandler = (e) => {
        e.preventDefault();
        const tableNum = Number(e.target.value)
        const table = tables.find((table)=> table.table_id === tableNum)
        setTable({
          ...table,
          "status": "Occupied",
          "reservation_id": reservation_number
        })
    }
    console.log("STATE VAR TABLE: ", table)
    /**
     * after table saved in a state variable,
     * change 'status' to "Occupied"
     * chenge 'reservation_id' to the ID in the params
     * make a PUT request to save data
     * history.push user to the dashboard
     */
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(
          `http://localhost:5001/tables/${table.table_id}/seat`,
          {
            method: "PUT",
            body: JSON.stringify(table),
            headers: {
              "Content-type": "application/json;charset=UTF-8"
            }
          }
        ); const savedData = await response.json();
        console.log("Saved table! ", savedData)
        history.push("/dashboard")
    }
    /**
     * HAVE THE VALUE BE THE TABLE ID
     * THEN MAKE A PUT REQUEST TO A TABLE BASED ON ID
     */
    return <form onSubmit={submitHandler}>
        <h3>Select a table:</h3>
        <select name="table_id" onChange={changeHandler} required>
            <option selected="true" disabled="disabled">Select a table</option>
            {tables ? <>
            {tables.map((table)=>{
              if (table.status === "Free") {
                return <option key={table.table_id} value={table.table_id} name={table.capacity}>{`${table.table_name} - ${table.capacity} guest(s)`}</option>                
              }
            })}
            </> : <option>Loading...</option>}
        </select>
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
    </form>
}

export default Seating