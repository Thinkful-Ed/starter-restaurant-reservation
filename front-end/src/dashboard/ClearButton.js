import { useHistory } from "react-router-dom";
import {clearTable} from "../utils/api"

function ClearButton({ table_id }) {
  const history = useHistory();
  async function handleClick() {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
        await clearTable(table_id);
      history.push("/");
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        data-table-id-finish={table_id}
        className="btn btn-primary"
      >
        Finish
      </button>
    </div>
  );
}

export default ClearButton;