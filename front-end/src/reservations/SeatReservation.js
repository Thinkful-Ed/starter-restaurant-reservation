import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import axios from "axios"
import TableOptions from "../tables/TableOptions"
import ErrorAlert from "../layout/ErrorAlert"

// Defines seat form for seating reservation at a table on seat path

export default function SeatReservation() {
    const URL = process.env.REACT_APP_API_BASE_URL
    const history = useHistory()
    const { reservation_id } = useParams()
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        setError(null)
        async function listTables() {
            try {
                const response = await axios.get(URL + "/tables", {
                    signal: abortController.signal,
                })
                setTables(response.data.data)
                setSelectedTable(response.data.data[0].table_id)
            } catch (error) {
                setError(error)
            }
        }
        listTables()
        return () => abortController.abort()
    }, [URL])

    const options = tables.map((table) => {
        return <TableOptions table={table} key={table.table_id} />
    })

    const handleChange = (event) => {
        event.preventDefault()
        setSelectedTable(event.target.value)
    }

    //Handles update request to table's 'reservation_id' assignment.
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.put(`${URL}/tables/${selectedTable}/seat`, {
                data: { reservation_id: reservation_id },
            })
            history.push("/dashboard")
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <div>
            <h1 className="my-4">Seat Reservation</h1>
            <ErrorAlert error={error} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="mr-2 mb-3 font-weight-bolder" htmlFor="table_id">Seat reservation at table:</label>
                    <select name="table_id" className="border border-dark border-2" onChange={handleChange}>
                        <option>Select an option</option>
                        {options}
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary mr-1 mb-3"
                    onClick={() => history.goBack()}
                >
                    <span className="oi oi-circle-x mr-2" />
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary mx-1 mb-3">
                <span className="oi oi-circle-check mr-2" />
                    Submit
                </button>
            </form>
        </div>
    )
}