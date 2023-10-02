import { useState } from "react"
import { useHistory } from "react-router-dom"

function TablesForm() {
    const history = useHistory();
    const initFormState = {
        "table_name": "",
        "capacity": "",
        "status": "Free",
        "reservation_id": 0
    }
    const [table, setTable] = useState(initFormState)
    const changeHandler = (e) => {
        setTable({
            ...table,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:5001/tables/new`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(table)
        }).then(()=>{
            console.log("Saved table: ", table)
        })
        history.push(`/dashboard`)
    }
    return <form onSubmit={submitHandler}>
        <label htmlFor="table_name">Table name</label>
        <input type="text" id="table_name" name="table_name" value={table.table_name} onChange={changeHandler} required/>
        <label htmlFor="capacity">Capacity</label>
        <input type="text" id="capacity" name="capacity" value={table.capacity} onChange={changeHandler} required/>
        <button className="btn btn-lg btn-dark">Cancel</button>
        <button className="btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
}

export default TablesForm