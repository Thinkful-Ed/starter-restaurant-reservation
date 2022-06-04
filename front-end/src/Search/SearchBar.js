import React from "react";

function SearchBar({ handleSubmit, handleChange, mobileNumber }) {
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div className="row">
                    <div className="form-group col col-md-4 col-sm-12">
                        <label htmlFor="mobile_number">Mobile Number:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                id="mobile_number"
                                name="mobile_number"
                                className="form-control"
                                placeholder="Enter the customer's mobile number"
                                value={mobileNumber}
                                onChange={handleChange}
                            />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-primary"><span className="oi oi-magnifying-glass"></span> Find</button>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default SearchBar;