import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
const { listTables, getReservation, seatTable } = require("../utils/api")

export default function SeatReservation() {
    
    const [tables, setTables] = useState([])
    const [tableBeingAssigned, setTableBeingAssigned] = useState(null)
    const [reservation, setReservation] = useState({})
    const [error, setError] = useState(null)

    const history = useHistory()
    const { reservation_id } = useParams()

    const handleChange = ({ target: {value} }) => {
        
        setTableBeingAssigned(tables.find(({table_id}) => table_id == value))
        
    }

    const handleCancel = () => {
        history.push(-1)
    }


    async function handleSubmit(event) {
        
        event.preventDefault()
        
        // check to make sure you aren't overseating the table
        if (reservation.people > tableBeingAssigned.capactiy) {
            setError("Table isn't big enough for party.")
            return
        }
        
        // make a call to API assigning table to reservation
        // return to dashboard
    
        
        /**
         * PUT to /tables/:table_id/seat/ in order to save the table assignment. 
         * The body of the request must be { data: { reservation_id: x } } 
         * where X is the reservation_id of the reservation being seated. 
         * The tests do not check the body returned by this request.
         */

        const abortController = new AbortController()
        console.log("reservation id", reservation_id, "table id", tableBeingAssigned.table_id)
        const response = await seatTable(reservation_id, `${tableBeingAssigned.table_id}`, abortController.signal)
        if (response.message) {
            setError(response)
            return
        } else {
            setError(null)
        }
    }
    


    /**
     * Loads reservations from API
     */
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
    
    /**
     * Loads tables from API
     */
    useEffect(() => {
        const abortController = new AbortController()
        setError(null)
        async function loadTablesFromApi() {
            try {
                const response = await listTables(abortController.signal)
                const tables = response.map((table) => (
                    { ...table }
                ))
                setTables(tables)
                } catch(error) {
                    setError(error)
                }
            }
            loadTablesFromApi()
    }, [])
        
    // Map out tables from API to populate select
    const content = tables.map((table, index) => (
        <option key={index} value={`${table.table_id}`}>{`${table.table_name} - ${table.capacity}`}</option>
    ))

    return (
        <div>
            <form>
                <label>
                    Tables:
                    <select id="table-select" name="table_id" onChange={handleChange}>
                        <option value="">-- Select a table --</option>
                        {content}
                    </select>
                </label>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                    Submit
                </button>
                <button type="cancel" onClick={handleCancel} className="btn btn-primary">
                    Cancel
                </button>
            </form>
        </div>
    )
}
