import { createDrone } from "/js/api/dronesApi.js";
import { createDelivery, scheduleDelivery, finishDelivery } from "/js/api/deliveriesApi.js";
import { updateDeliveryList } from "/js/main.js";

export function initEventHandlers() {
  // Knap: opret drone
  const btnCreateDrone = document.getElementById("btnCreateDrone");
  btnCreateDrone.addEventListener("click", async () => {
    const result = await createDrone();
    alert(result.message || "Drone oprettet!");
    updateDeliveryList();
  });

  // Knap: simuler levering
  const btnSimulateDelivery = document.getElementById("btnSimulateDelivery");
  btnSimulateDelivery.addEventListener("click", async () => {
    // Her vælges et pizzaID
    const pizzaId = prompt("Indtast pizza ID:", "1");
    const address = prompt("Indtast leveringsadresse:", "Test Street 123");
    if (pizzaId && address) {
      const result = await createDelivery(pizzaId, address);
      alert(result.message || "Levering oprettet!");
      updateDeliveryList();
    }
  });

  // Custom event: Tildel Drone (scheduleDelivery)
  document.addEventListener("scheduleDelivery", async (e) => {
    const { deliveryId } = e.detail;

      const result = await scheduleDelivery(deliveryId);
      alert(result.message);
      updateDeliveryList();
  });

  // Custom event: Afslut levering
  document.addEventListener("finishDelivery", async (e) => {
    const { deliveryId } = e.detail;
    const result = await finishDelivery(deliveryId);
    alert(result.message);
    updateDeliveryList();
  });
}
