/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

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
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}


// function to create new reservations
export async function createReservations(data, signal){
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    headers, 
    signal,
    method: "POST",
    body: JSON.stringify({data})
  }
  return await fetchJson(url, options, data)
}

//function to list tables
export async function listTables(params, signal){
  const url = new URL(`${API_BASE_URL}/tables`)
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  )
  return await fetchJson(url, { headers, signal }, [])
}

//function to create new tables
export async function createTables(data, signal){
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    headers, 
    signal,
    method: "POST",
    body: JSON.stringify({data})
  }
  return await fetchJson(url, options, data)
}

//function to get reservation information
export async function getReservation(reservation_id, signal){
  // console.log("asdf params:", params)
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`)
  // Object.entries(params).forEach(([key, value]) =>
  //   url.searchParams.append(key, value.toString())
  // )
  return await fetchJson(url, { headers, signal }, [])
}

//function to create a seat reservation
export async function seatReservation(reservation_id, signal){
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/seat`);
  const options = {
    headers, 
    signal,
    method: "POST",
    body: JSON.stringify({reservation_id})
  }
  return await fetchJson(url, options, reservation_id)
}

//function to update status, this url is looking for the server
export async function statusUpdate(reservation_id, table_id, signal){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    headers, 
    signal,
    method: "PUT",
    body: JSON.stringify({data: {reservation_id}})
  }
  return await fetchJson(url, options, reservation_id)
}


//function to delete/remove the table assignment
export async function removeReservation(table_id, signal){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    headers, 
    signal,
    method: "DELETE",
  }
  return await fetchJson(url, options, {});
};

/**
 * Sets the status of the reservation with the specified `reservationId` to cancelled.
 * @param reservationId
 * the id of the reservation to delete
 * @returns {Promise<null|String>}
 * a promise that resolves to null or an error message.
 */
 export async function cancelReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}/status`;
  const options = {
    method: "PUT",
    body: JSON.stringify({
      data: { status: "cancelled"}
    }), 
    headers, 
    signal,
  };
  return await fetchJson(url, options, {});
 };