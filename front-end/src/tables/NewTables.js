import React, { useState } from 'react';
import { useHistory } from "react-router";
import {createTable} from "../utils/api"
import ErrorAlert from '../layout/ErrorAlert';
import TablesForm from './TablesForm';

function NewTables() {
    const initTable = {
        "table_name": "",
        "capacity": 0
    }
    const [table, setTable] = useState(initTable)
    const [tablesError, setTablesError] = useState(null)
    const history = useHistory()

    const submitHandler = async (event) => {
        event.preventDefault()

        const abortController = new AbortController()

        createTable(table, abortController.signal)
            .then((createdRecord)=> history.push("/dashboard"))
            .catch(setTablesError)

        return ()=> abortController.signal
    }
    const cancelHandler = () => {
        history.goBack();
      };

    return ( 
        <div>
            <ErrorAlert error={tablesError} />
            <TablesForm 
                submitHandler={submitHandler}
                cancelHandler={cancelHandler} 
                setTable={setTable} 
                table={table}
            />
        </div>
     );
}

export default NewTables;