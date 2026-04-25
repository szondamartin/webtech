import { state } from "./state.js";

const tableBody = document.querySelector("#tableBody");
const messageBox = document.querySelector("#messageBox");


const createModal = document.querySelector("#createModal");
const detailsModal = document.querySelector("#detailsModal");
const detailsContent = document.querySelector("#detailsModalContent");


export function showMessage(text, type = "success") {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
  messageBox.style.display = "block";
}

export function hideMessage() {
  messageBox.style.display = "none";
}


export function renderTable() {
  const filtered = state.records.filter(r => {
    return (
      (!state.filters.id || String(r.id) === state.filters.id) &&
      (!state.filters.brand || String(r.brand || "").toLowerCase().includes(state.filters.brand)) &&
      (!state.filters.model || String(r.model || "").toLowerCase().includes(state.filters.model)) &&
      (!state.filters.owner || String(r.owner || "").toLowerCase().includes(state.filters.owner))
    );
  });

  tableBody.innerHTML = filtered.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.brand}</td>
      <td>${r.model}</td>
      <td>
        <button data-action="details" data-id="${r.id}">Részletek</button>
        <button data-action="edit" data-id="${r.id}">Szerkesztés</button>
        <button data-action="delete" data-id="${r.id}">Törlés</button>
      </td>
    </tr>
  `).join("");
}


export function openCreateModal() {
  document.querySelector("#recordForm").reset();
  document.querySelector("#recordId").value = "";
  createModal.style.display = "flex";
}

export function openEditModal(r) {
  document.querySelector("#recordId").value = r.id;
  document.querySelector("#nameInput").value = r.brand;
  document.querySelector("#descriptionInput").value = r.model;
  document.querySelector("#fuelUseInput").value = r.fuelUse;
  document.querySelector("#ownerInput").value = r.owner;
  document.querySelector("#dateInput").value = r.dayOfCommission;
  document.querySelector("#electricInput").checked = r.electric;

  createModal.style.display = "flex";
}

export function closeModal() {
  createModal.style.display = "none";
}


export function openDetailsModal(r) {
  detailsContent.innerHTML = `
    <p><b>ID:</b> ${r.id}</p>
    <p><b>Márka:</b> ${r.brand}</p>
    <p><b>Modell:</b> ${r.model}</p>
    <p><b>Fogyasztás:</b> ${Number(r.fuelUse).toFixed(2)}</p>
    <p><b>Tulaj:</b> ${r.owner}</p>
    <p><b>Dátum:</b> ${r.dayOfCommission}</p>
    <p><b>Elektromos:</b> ${r.electric ? "Igen" : "Nem"}</p>
  `;

  detailsModal.style.display = "flex";
}

export function closeDetailsModal() {
  detailsModal.style.display = "none";
}