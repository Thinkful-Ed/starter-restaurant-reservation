import { useEffect, useState } from "react"

export default function SeatReservation() {
    
    const [tables, setTables] = useState([])

    const handleChange = ({ target }) => {
        
    }
    
    const content = tables.map((table, index) => (
        <option value={`${table.table_name}`}>{`${table.table_name} - ${table.capacity}`}</option>
    ))
    
    return (
        <div>
            <form>
                <label>
                    Tables:
                    <select
                        id="table-select"
                        name="table_id"
                        onChange={handleChange}
                        value={}
                    >
                        <option value="">-- Select a table --</option>
                        {content}
                    </select>
                </label>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <button type="cancel" onClick={handleCancel} className="btn btn-primary">
                    Cancel
                </button>
            </form>
        </div>
    )
}

// <select name="table_id" />
// text of each option is {table.table_name} - {table.capacity}