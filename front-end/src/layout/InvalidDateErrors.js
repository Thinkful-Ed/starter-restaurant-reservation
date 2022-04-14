import React from 'react'

export default function InvalidDateErrors({errors}) {
    return (
        errors && (
            <div className="alert alert-danger">
                <p>The following issues occurred:</p>
                {errors.map((error, index) => (
                    <>
                    {error ? <li>{error}</li>: null}
                    </>
                ))}
            </div>
        )
    )
}