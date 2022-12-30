import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
// import { createTable } from "../utils/api";

function CreateTable() {
    const history = useHistory();
    const [formErrors, setFormErrors] = useState(null);
    const [tablesErrors, setTablesErrors] = useState(null);
    const initialTableFormData = {

        table_name: ``,
        capacity: ``,
    };
    const [tableFormData, setTableFormData] = useState({ ...initialTableFormData });

    const handleTableCreate = async (table) => {

        const abortController = new AbortController();
        try {
            // await createTable(table, abortController.signal);

            history.push(`/dashboard`);
        }
        catch (error) {
            if (error) {
                setTablesErrors(error);
            }
        }

        //} 
        return () => abortController.abort();
    };


    const handleTableChange = ({ target }) => {
        setTableFormData({
            ...tableFormData,
            [target.name]: target.value,
        });
    };
    const handleTableSubmit = (event) => {
        event.preventDefault();
        handleTableCreate(tableFormData);

    };
    function validCapacity(table) {
        const errors = [];
        if (table.capacity < 1) {
            errors.push({ key: 1, message: 'Form: Capacity must be at least 1' })
        }
        if (table.table_name.lenth < 2) {
            errors.push({ key: 2, message: 'Form: Table name must be at least 2 characters' })
        }
        return errors;
    }

    const formValidation = (event) => {
        event.preventDefault();
        const capacityError = validCapacity(tableFormData);
        setFormErrors([capacityError])
        if (formErrors.length === 0) {
            handleTableSubmit(event);
        }
    }

    return (
        <div className="pt-3">
            {formErrors && formErrors.map((formError) => (
                <ErrorAlert error={formError} />
            ))}
            {tablesErrors &&
                <ErrorAlert error={tablesErrors} />
            }
            <form name="Tables" onSubmit={formValidation}>
                <table className="table table-bordered table-condensed table-striped">
                    <tbody>
                        <tr>
                            <th colSpan={"3"}>Create a Table</th></tr>
                        <tr>
                            <td><label htmlFor="table_name">Table Name</label></td>
                            <td><label htmlFor="capacity">Capacity</label></td>
                            <td>Actions</td>
                            </tr>
                        <tr>
                            <td><input name="table_name"
                                id="table_name"
                                placeholder="Table Name"
                                type="text"
                                onChange={handleTableChange}
                                value={tableFormData.table_name} required /></td>
                            <td><input name="capacity"
                                id="capacity"
                                placeholder="Capacity"
                                type="number"
                                onChange={handleTableChange}
                                value={tableFormData.capacity} required /></td>
                            <td><button type="submit" className="btn btn-primary mr-3">Submit</button>
                                <button type="button" onClick={() => history.goBack()} className="btn btn-danger">Cancel</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
export default CreateTable;