import axios from "axios"
import React, { useState, useEffect } from "react"
import ErrorAlert from "../../layout/ErrorAlert"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

export default function Table({ table, setRefresh = false }) {
  const [isOccupied, setIsOccupied] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    setIsOccupied(table.reservation_id && true)
  }, [table])

  const handleClick = async () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/reservations/${table.reservation_id}/status`,
          { data: { status: "finished" } }
        )
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/tables/${table.table_id}/seat`
        )
        setIsOccupied(false)
        setRefresh(true)
      } catch (err) {
        if (err.response) {
          setDeleteError(err.response.data)
        }
      }
    }
  }

  return (
    <div className="container card-body">
      <h5 className="text-center">{table.table_name}</h5>
      <div className="m-2" data-table-id-status={table.table_id}>
        {isOccupied ? (
          <div className="d-flex justify-content-between">
            <span className="badge bg-danger text-light my-auto">
              <h5>
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Occupied by #{table.reservation_id}
              </h5>
            </span>
            <button
              onClick={handleClick}
              data-table-id-finish={table.table_id}
              className="btn btn-outline-secondary"
            >
              Finish
            </button>
          </div>
        ) : (
          <span className="badge bg-success text-light">
            <h5>
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Available
            </h5>
          </span>
        )}
      </div>
      <ErrorAlert error={deleteError} />
    </div>
  )
}
