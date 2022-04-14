import React from 'react'

export default function FormPage({onSubmit, onCancel, formData, setFormData}) {
    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="first_name" className="form-label">
                    First Name
                </label>
                <input 
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={formData.first_name}
                    className="form-control"
                    required
                />
                <label htmlFor="last_name" className="form-label">
                    Last Name
                </label>
                <input 
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={formData.last_name}
                    className="form-control"
                    required
                />
                <label htmlFor="mobile_number" className="form-label">
                    Mobile Number
                </label>
                <input 
                    id="first_name"
                    type="tel"
                    name="mobile_number"
                    placeholder="XXX-XXX-XXXX"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={handleChange}
                    value={formData.mobile_number}
                    className="form-control"
                    required
                />
                <label htmlFor="reservation_date" className="form-label">
                    Date Requested:
                </label>
                <input 
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.reservation_date}
                    required
                />
                <label htmlFor="reservation_time" className="form-label">
                    Time Requested:
                </label>
                <input 
                    id="reservation_date"
                    type="time"
                    name="reservation_time"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.reservation_time}
                    required
                />
                <label htmlFor="people" className="form-label">
                    Number of People in Party:
                </label>
                <input 
                    id="people"
                    type="number"
                    name="people"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.people}
                    required
                />
            </div>
            <div className="mt-2">
                <button type="submit" className="btn btn-primary mr-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}