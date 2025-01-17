// js/api/deliveriesApi.js

const baseUrl = 'http://localhost:8080';

export async function fetchNonFinishedDeliveries() {
  const response = await fetch(`${baseUrl}/deliveries`);
  if (!response.ok) {
    throw new Error("Fejl ved hentning af leveringer");
  }
  return await response.json(); // { success, message, data: [...] }
}

export async function fetchDeliveriesWithoutDrone() {
  const response = await fetch(`${baseUrl}/deliveries/queue`);
  if (!response.ok) {
    throw new Error("Fejl ved hentning af leveringer uden drone");
  }
  return await response.json();
}

export async function createDelivery(pizzaId, address) {
  const url = `${baseUrl}/deliveries/add?pizzaId=${pizzaId}&address=${encodeURIComponent(address)}`;
  const response = await fetch(url, { method: "POST" });
  return await response.json(); // { success, message, data }
}

export async function scheduleDelivery(deliveryId) {
  const url = `${baseUrl}/deliveries/schedule?deliveryId=${deliveryId}`;
  const response = await fetch(url, { method: "POST" });
  return await response.json();
}

export async function finishDelivery(deliveryId) {
  const url = `${baseUrl}/deliveries/finish?deliveryId=${deliveryId}`;
  const response = await fetch(url, { method: "POST" });
  return await response.json();
}
