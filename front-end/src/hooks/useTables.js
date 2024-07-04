import { useState, useEffect } from "react";
import { listTables } from "../utils/api";

function useTables() {
  const [tables, setTables] = useState([]);
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [errorTables, setErrorTables] = useState([]);

  useEffect(() => {
    
    const abortController = new AbortController();
    
    setTables([]);
    setIsLoadingTables(true);
    setErrorTables([]);

    async function loadTables() {
        try {
            const tablesList = await listTables( abortController.signal);
            setTables(tablesList);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
            setErrorTables([errorMessage]);
        } finally {
            setIsLoadingTables(false);
        }
    }

    loadTables();

    return () => { abortController.abort();};

  }, []);

  return { tables, isLoadingTables, errorTables };
}

export default useTables;
