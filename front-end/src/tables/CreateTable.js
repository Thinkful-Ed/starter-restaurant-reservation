import React from "react"
import TableForm from "./TableForm"

//Format for CreateTable component for dashboard page.

export default function CreateTable() {
    return (
        <div>
            <h1 className="my-4">New Table</h1>
            <TableForm />
        </div>
    )
}