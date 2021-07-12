import { useState } from "react";
import useQuery from "../utils/useQuery";
import dayjs from "dayjs";

import Reservations from "./Reservations";
import Tables from "./Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();
  const date = query.get("date") || dayjs().format("YYYY-MM-DD");

  // an update trigger that allows children to call a reload for the entire dashboard.
  // to trigger an update, toggle updateAll using setUpdateAll.
  // to hook a component into global updates, add updateAll to its useEffect dependencies.
  const [updateAll, setUpdateAll] = useState(false);

  return (
    <main>
      <h1>Dashboard</h1>
      <Reservations date={date} updateAll={updateAll} />
      <Tables setUpdateAll={setUpdateAll} updateAll={updateAll} />
    </main>
  );
}

export default Dashboard;
