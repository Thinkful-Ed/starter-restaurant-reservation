import React, {useState} from "react"
import { createTables } from "../utils/api"
import TableForm from "./TableForm"
import {useHistory} from "react-router-dom"

function AddTable(){
    const history = useHistory()

    const initialTableForm = {
        table_name: "", 
        capacity: ""
    }

    const [tableForm, setTableForm] = useState(initialTableForm)
    const [errors, setErrors] = useState([])

    const handleChangeTable = ({target})=>{
        console.log("target: ", target.value)
        setTableForm({
            ...tableForm,
            [target.name]: target.value
        })
    }

    const handleSubmitTable = async (event)=>{
        event.preventDefault()
        const ac = new AbortController()
        try{
            // console.log("hello")
            const newTable = await createTables({...tableForm, capacity: Number(tableForm.capacity)}, ac.signal)
            console.log(newTable)
            setTableForm(initialTableForm)
            history.push(`/dashboard`)
        }catch(e){
            setErrors([...errors, e])
            console.log(e)
        }
        return ()=> ac.abort()
    }


    return (
        <>
            <TableForm 
            handleChangeTable={handleChangeTable}
            handleSubmitTable={handleSubmitTable}
            tableForm={tableForm}
            />
        </>

    )

}

export default AddTable