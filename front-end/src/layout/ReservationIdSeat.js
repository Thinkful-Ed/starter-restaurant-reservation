import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import { listTables, statusUpdate, getReservation } from "../utils/api";


function ReservationIdSeat(){
    const params = useParams()
    const history = useHistory()
    const [allTables, setAllTables] = useState([])
    const [tableId, setTableId] = useState(null)
    const [currentReservation, setCurrentReservation] = useState(null)


    // console.log("params: ", params.reservation_id)



    useEffect(()=>{
        const getReserve = async () =>{
            try{
                const thisReservation = await getReservation(params.reservation_id)
                setCurrentReservation(thisReservation)
            }catch(e){
                console.log(e)
            }
        }
        getReserve()
    }, [])


    // console.log("current rezz", currentReservation)
// let tableCapacities = {}

    useEffect(()=>{
        const getTables = async () =>{
            try{
                const getAllTables = await listTables(params.reservation_id)
                // console.log("getAllTables: ", getAllTables)
                // getAllTables.map((eachTable)=>{
                //     tableCapacities[eachTable.table_id] = eachTable.capacity
                // })
                // console.log("tableCapacities", tableCapacities)
                setAllTables(getAllTables)
            }catch(e){
                console.log(e)
            }
        }
        getTables()
    }, [])


    // console.log("reservationID", params.reservation_id)
    // console.log("tableId", tableId)

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const abortController = new AbortController()
       
        try {
            //need to pass in parameters: reservationId
            // console.log("submit's table id", tableId)
            // console.log("reservationID", params.reservation_id)
            const response = await statusUpdate(params.reservation_id, tableId)
            
            console.log("response: ", response)
            setTableId(null)
            history.push("/")

            console.log("response", response)
        } catch (e) {
            console.log(e)
        }

    }

    const changeHandler = async (event) => {
        // console.log("This is the value: ", event.target.value)
        setTableId(event.target.value)
    }


    return(
        <>
            <h2>Seating for Reservation Number {params.reservation_id}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="table_id">
                    Table Number:
                </label>
                <select name="table_id" id="table_id" size="1" required  onChange={changeHandler}>
                    {/* <option value="">{table.table_name} - {table.capacity}</option> */}
                    <option>Choose a table</option>
                    {allTables.map((eachTable)=>{
                        
                    return <option key={eachTable.table_id} value={eachTable.table_id}>{eachTable.table_name} - {eachTable.capacity}</option>
                })}
                </select>            

                <div className="row">
                <div className="col-sm">
                    
                    <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                </div>
                
            </div>
            </form>
            <button type="button" className="btn btn-secondary" onClick={()=> history.push("/reservations/new")}>Cancel</button>
        </>
        
    )
}

export default ReservationIdSeat