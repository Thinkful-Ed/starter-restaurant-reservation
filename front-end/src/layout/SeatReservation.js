import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {listTables, readReservation, updateTableStatus} from "../utils/api"
import ErrorAlert from "./ErrorAlert"

export default function SeatReservation() {

    const initialFormState = {
        table_id: null
    }

    const {reservationId} = useParams()

    const history = useHistory()

    const [reservation, setReservation] = useState({})
    const [error, setError] = useState(null)
    const [tables, setTables] = useState([])
    const [formData, setFormData] = useState({...initialFormState})

    useEffect(() => {
        const ac = new AbortController()
        readReservation(reservationId, ac.signal).then(setReservation).catch(setError)
        return () => ac.abort()
    }, [reservationId])

    useEffect(() => {
        const ac = new AbortController()
        listTables(ac.signal).then(setTables).catch(setError)
        return () => ac.abort()
    }, [])

    const tableOptions = tables.map(table => (
        <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
    ))

    const handleChange = ({target}) => {
        setFormData({
            [target.name]: target.value
        })
    }
    
    const handleTableSelection = (event) => {
        event.preventDefault()
        const ac = new AbortController()
        updateTableStatus(formData.table_id, reservation.reservation_id, ac.signal).then(() => history.push("/dashboard")).catch(setError)
        return () => ac.abort()
    }

    return (
        <div>
            <h1>Seat Reservation</h1>
            <ErrorAlert error={error}/>
            <h2>{reservation.reservation_id} - {reservation.first_name} {reservation.last_name} on {reservation.reservation_date} at {reservation.reservation_time} | Party of {reservation.people}</h2>
            <form onSubmit={handleTableSelection}>
                <label htmlFor="table_id" className="form-label">
                    Seat At:
                </label>
                <select id="table_id" name="table_id" className="form-control" onChange={handleChange} required>
                    <option value>Select a Table</option>
                    {tableOptions}
                </select>
                <div className="mt-2">
                    <button type="button" className="btn btn-secondary mr-2" onClick={() => history.goBack()}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}