// js/main.js
import { initEventHandlers } from "/js/event.js";
import { fetchNonFinishedDeliveries } from "/js/api/deliveriesApi.js";
import { renderDeliveries } from "/js/render.js";
import { displayPizzas } from "/js/render.js";


// En funktion, der henter leveringer og opdaterer DOM
export async function updateDeliveryList() {
  try {
    const data = await fetchNonFinishedDeliveries();
    // data = { success, message, data: [ ...deliveries ] }
    renderDeliveries(data);
  } catch (err) {
    console.error("Fejl ved opdatering af leveringsliste:", err);
  }
}

async function init() {
  initEventHandlers();
  // Første gang vi loader siden, henter vi leveringer
  updateDeliveryList();

  // Opdater hvert 60. sekund
  setInterval(() => {
    updateDeliveryList();
  }, 60000);
}

// Kald init når scriptet er loadet
document.addEventListener("DOMContentLoaded", () => {
    init(); // Initialize event handlers and update deliveries
    displayPizzas(); // Fetch and display pizzas
  });
  
