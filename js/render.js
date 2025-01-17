// js/render.js

import { fetchAllPizzas } from "/js/api/pizzasApi.js";

/**
 * Render en liste af leveringer i #delivery-list
 * Sorter eventuelt leveringer efter “ældste først”
 * deliveriesData er selve JSON-svaret => { success, message, data: [...] }
 */
export function renderDeliveries(deliveriesData) {
  const container = document.getElementById("delivery-list");

  // Ryd container
  container.innerHTML = "";

  // Tjek om success
  if (!deliveriesData.success) {
    // Vis fejlbesked i stedet
    const errorDiv = document.createElement("div");
    errorDiv.textContent = `FEJL: ${deliveriesData.message}`;
    container.appendChild(errorDiv);
    return;
  }

  const deliveries = deliveriesData.data;

  // Sorter: ældste levering først
  deliveries.sort((a, b) => {
    const dateA = new Date(a.expectedDeliveryTime);
    const dateB = new Date(b.expectedDeliveryTime);
    return dateA - dateB; // ældste først
  });

  // Byg HTML-kort for hver levering
  deliveries.forEach(delivery => {
    const card = document.createElement("div");
    card.className = "delivery-card";

    const title = document.createElement("div");
    title.className = "delivery-title";
    title.innerHTML = `
    <div>
    <h3>Levering #${delivery.id}</h3>
    <p><strong>Address:</strong> ${delivery.address}</p>
    <p><strong>Pizza:</strong> #${delivery.pizza.id} - ${delivery.pizza.title}</p>
    </div>
    `;

    card.appendChild(title);

    const status = document.createElement("div");
    status.className = "delivery-status";
    if (!delivery.drone) {
      status.textContent = "Status: Mangler drone";
    } else {
      status.textContent = `Status: Tildelt drone (ID: ${delivery.drone.id})`;
    }
    card.appendChild(status);

    // Actions
    const actions = document.createElement("div");
    actions.className = "delivery-actions";

    // Hvis ingen drone => vis “Tildel drone”-knap
    if (!delivery.drone) {
      const btnSchedule = document.createElement("button");
      btnSchedule.textContent = "Tildel Drone";
      btnSchedule.addEventListener("click", () => {
        // custom event eller direct kald
        const event = new CustomEvent("scheduleDelivery", {
          detail: { deliveryId: delivery.id },
        });
        document.dispatchEvent(event);
      });
      actions.appendChild(btnSchedule);
    }

    // Mulighed for “Afslut levering”-knap (simulere at dronen leverer)
    // Men kun hvis den HAR en drone og IKKE er færdig
    // Check if the delivery has a drone but is not finished
    if (delivery.drone && !delivery.actualDeliveryTime) {

        // Aflevering simulation, grå, gul, grøn
        setTimeout(() => {
        btnFinish.style.backgroundColor = "yellow";
        
        setTimeout(() => {
        btnFinish.style.backgroundColor = "green";
    }, 3000);
  },   3000);

      const btnFinish = document.createElement("button");
      btnFinish.textContent = "Afslut Levering";

      btnFinish.addEventListener("click", () => {
        // Dispatch the "finishDelivery" custom event
        const event = new CustomEvent("finishDelivery", {
          detail: { deliveryId: delivery.id },
        });
        document.dispatchEvent(event);

      });

      actions.appendChild(btnFinish);
    }

    card.appendChild(actions);
    container.appendChild(card);
  });
}


const pizzaListContainer = document.getElementById("pizza-list");

/**
 * Henter og viser alle pizzaer i #pizza-list
 */
export async function displayPizzas() {
  try {
    // Fetch pizza data
    const response = await fetchAllPizzas();
    const pizzas = response.data;

    // Clear 
    pizzaListContainer.innerHTML = "";

    // Check pizza list eksisterer
    if (!pizzas || pizzas.length === 0) {
      pizzaListContainer.innerHTML = "<p>Ingen pizzaer fundet.</p>";
      return;
    }

    // Generate HTML for hver pizza objekt
    pizzas.forEach((pizza) => {
      const pizzaElement = document.createElement("div");
      pizzaElement.className = "pizza-item";
      pizzaElement.innerHTML = `
        <h3>${pizza.title}</h3>
        <p><strong>ID:</strong> ${pizza.id}</p>
        <p><strong>Pris:</strong> ${pizza.price} kr</p>
      `;
      pizzaListContainer.appendChild(pizzaElement);
    });
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    pizzaListContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
