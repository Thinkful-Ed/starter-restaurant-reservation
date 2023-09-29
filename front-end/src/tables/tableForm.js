import {Link} from "react-router-dom"

function TablesForm() {
    return <form>
        <label htmlFor="table_name">Table name</label>
        <input type="text" id="table_name" name="table_name" required/>
        <label htmlFor="capacity">Capacity</label>
        <input type="text" id="capacity" name="capacity" required/>
        <button className="btn btn-lg btn-dark">Cancel</button>
        <button className="btn btn-lg btn-primary">Submit</button>
    </form>
}

export default TablesForm