const BASE_URL = "https://iit-playground.arondev.hu/api";
const NEPTUN = "cdedot";

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}/${NEPTUN}${endpoint}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Hiba történt");
  }

  return data;
}

export const fetchRecords = () => request("/car");

export const fetchRecordById = (id) => request(`/car/${id}`);

export const createRecord = (data) =>
  request("/car", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateRecord = (data) =>
  request("/car", {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteRecord = (id) =>
  request(`/car/${id}`, {
    method: "DELETE"
  });