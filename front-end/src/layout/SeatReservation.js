import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
const { listTables, getReservation } = require("../utils/api")

export default function SeatReservation() {
    
    const [tables, setTables] = useState([])
    const [reservation, setReservation] = useState({})
    const [error, setError] = useState(null)

    const history = useHistory()
    const { reservation_id } = useParams()

    const handleChange = ({ target }) => {
        
    }

    const handleCancel = () => {
        history.push(-1)
    }

    const handleSubmit = () => {
        
    }

    useEffect(() => {
        const abortController = new AbortController()
        setError(null)
        async function loadReservationFromApi() {
            try {
                const response = await getReservation(abortController.signal, reservation_id)
                const reservation = response.json()
                setReservation(reservation)
            } catch (error) {
                setError(error)
            }
        }
        loadReservationFromApi()
        console.log("reservation", reservation)
    }, [])
    
    useEffect(() => {
        const abortController = new AbortController()
        setError(null)
        async function loadTablesFromApi() {
            try {
                const response = await listTables(abortController.signal)
                const tables = response.map((table) => (
                    { ...table, isOccupied: false }
                    ))
                    setTables(tables)
                } catch(error) {
                    setError(error)
                }
            }
            loadTablesFromApi()
    }, [])
        
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