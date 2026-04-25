import { state } from "./state.js";
import {
  fetchRecords,
  fetchRecordById,
  createRecord,
  updateRecord,
  deleteRecord
} from "./api.js";
import {
  renderTable,
  showMessage,
  hideMessage,
  openCreateModal,
  openEditModal,
  closeModal,
  openDetailsModal,
  closeDetailsModal
} from "./ui.js";


const table = document.querySelector("#tableBody");
const form = document.querySelector("#recordForm");

const createModal = document.querySelector("#createModal");
const detailsModal = document.querySelector("#detailsModal");


async function init() {
  bindEvents();
  await load();
}


function bindEvents() {
  document.querySelector("#refreshBtn").onclick = load;
  document.querySelector("#openCreateModalBtn").onclick = openCreateModal;

  document.querySelector("#closeModalBtn").onclick = closeModal;
  document.querySelector("#cancelModalBtn").onclick = closeModal;

  document.querySelector("#closeDetailsBtn").onclick = closeDetailsModal;


  createModal.onclick = (e) => {
    if (e.target === createModal) closeModal();
  };

  detailsModal.onclick = (e) => {
    if (e.target === detailsModal) closeDetailsModal();
  };


  table.onclick = handleTable;


  form.onsubmit = submitForm;


  document.querySelector("#filterBtn").onclick = () => {
    state.filters.id = document.querySelector("#filterId").value;
    state.filters.brand = document.querySelector("#filterBrand").value.toLowerCase();
    state.filters.model = document.querySelector("#filterModel").value.toLowerCase();
    state.filters.owner = document.querySelector("#filterOwner").value.toLowerCase();

    renderTable();
  };
}


async function load() {
  try {
    hideMessage();
    state.records = await fetchRecords();
    renderTable();
  } catch (err) {
    showMessage(err.message, "error");
  }
}


async function handleTable(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;

  if (btn.dataset.action === "details") {
    const r = await fetchRecordById(id);
    openDetailsModal(r);
  }

  if (btn.dataset.action === "edit") {
    const r = await fetchRecordById(id);
    openEditModal(r);
  }

  if (btn.dataset.action === "delete") {
    if (!confirm("Biztos törlöd?")) return;
    await deleteRecord(id);
    await load();
  }
}


async function submitForm(e) {
  e.preventDefault();

  const id = document.querySelector("#recordId").value;

  const payload = {
    id: Number(id),
    brand: document.querySelector("#nameInput").value,
    model: document.querySelector("#descriptionInput").value,
    fuelUse: parseFloat(document.querySelector("#fuelUseInput").value),
    owner: document.querySelector("#ownerInput").value,
    dayOfCommission: document.querySelector("#dateInput").value,
    electric: document.querySelector("#electricInput").checked
  };

  try {
    if (id) {
      await updateRecord(payload);
    } else {
      await createRecord(payload);
    }

    closeModal();
    await load();
  } catch (err) {
    showMessage(err.message, "error");
  }
}


init();