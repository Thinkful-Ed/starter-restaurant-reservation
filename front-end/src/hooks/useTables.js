import { useState, useEffect } from "react";
import { listTables } from "../utils/api";

function useTables() {
  const [tables, setTables] = useState([]);
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [tablesError, setTablesError] = useState([]);

  useEffect(() => {
    
    const abortController = new AbortController();
    
    setTables([]);
    setIsLoadingTables(true);
    setTablesError([]);

    async function loadTables() {
        try {
            const tablesList = await listTables( abortController.signal);
            setTables(tablesList);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
            setTablesError([errorMessage]);
        } finally {
            setIsLoadingTables(false);
        }
    }

    loadTables();

    return () => { abortController.abort();};

  }, []);

  return { tables, setTables, isLoadingTables, tablesError };
}

export default useTables;
