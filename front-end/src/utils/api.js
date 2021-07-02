/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
 const API_BASE_URL =
 process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
* Defines the default headers for these functions to work with `json-server`
*/
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
* Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
*
* This function is NOT exported because it is not needed outside of this file.
*
* @param url
*  the url for the requst.
* @param options
*  any options for fetch
* @param onCancel
*  value to return if fetch call is aborted. Default value is undefined.
* @returns {Promise<Error|any>}
*  a promise that resolves to the `json` data or an error.
*  If the response is not in the 200 - 399 range the promise is rejected.
*/
async function fetchJson(url, options, onCancel) {
 try {
   const response = await fetch(url, options);

   if (response.status === 204) {
     return null;
   }

   const payload = await response.json();

   if (payload.error) {
     return Promise.reject({ message: payload.error });
   }
   return payload.data;
 } catch (error) {
   if (error.name !== "AbortError") {
     console.error(error.stack);
     throw error;
   }
   return Promise.resolve(onCancel);
 }
}

/**
* Retrieves all existing reservation.
* @returns {Promise<[reservation]>}
*  a promise that resolves to a possibly empty array of reservation saved in the database.
*/

export async function listReservations(params, signal) {
 const url = new URL(`${API_BASE_URL}/reservations`);

 if(params) {
   Object.entries(params).forEach(([key, value]) =>
     url.searchParams.append(key, value.toString())
   );
 }

 return await fetchJson(url, { headers, signal, method: "GET" }, []);
}

/**
* Creates a new reservation.
*/
export async function createReservation(reservation, signal) {
 const url = `${API_BASE_URL}/reservations`;

 const body = JSON.stringify({ data: reservation });

 return await fetchJson(url, { headers, signal, method: "POST", body }, []);
}

/**
* Edits an existing reservation.
*/
export async function editReservation(reservation_id, reservation, signal) {
 const url = `${API_BASE_URL}/reservations/${reservation_id}`;

 const body = JSON.stringify({ data: reservation });

 return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/**
* Updates a reservation's status.
*/
export async function updateReservationStatus(reservation_id, status, signal) {
 const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;

 const body = JSON.stringify({ data: { status: status }});

 return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/**
* Lists all tables in the database.
*/
export async function listTables(signal) {
 const url = `${API_BASE_URL}/tables`;

 return await fetchJson(url, { headers, signal, method: "GET" }, []);
}

/**
* Creates a new table.
*/
export async function createTable(table, signal) {
 const url = `${API_BASE_URL}/tables`;

 const body = JSON.stringify({ data: table });

 return await fetchJson(url, { headers, signal, method: "POST", body }, []);
}

/**
* Seats a reservation at a table.
*/
export async function seatTable(reservation_id, table_id, signal) {
 const url = `${API_BASE_URL}/tables/${table_id}/seat`;

 const body = JSON.stringify({ data: { reservation_id: reservation_id } });

 return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/**
* Finishes a table.
*/
export async function finishTable(table_id, signal) {
 const url = `${API_BASE_URL}/tables/${table_id}/seat`;

 return await fetchJson(url, { headers, signal, method: "DELETE" }, []);
}