// js/api/dronesApi.js

const baseUrl = "http://localhost:8080";

export async function fetchAllDrones() {
  const response = await fetch(`${baseUrl}/drones`);
  if (!response.ok) {
    throw new Error("Fejl ved hentning af droner");
  }
  return await response.json(); // { success, message, data: [...] }
}

export async function createDrone() {
  const response = await fetch(`${baseUrl}/drones/add`, { method: "POST" });
  return await response.json();
}

export async function enableDrone(droneId) {
  const url = `${baseUrl}/drones/enable?droneId=${droneId}`;
  const response = await fetch(url, { method: "POST" });
  return await response.json();
}

export async function disableDrone(droneId) {
  const url = `${baseUrl}/drones/disable?droneId=${droneId}`;
  const response = await fetch(url, { method: "POST" });
  return await response.json();
}

export async function retireDrone(droneId) {
  const url = `${baseUrl}/drones/retire?droneId=${droneId}`;
  const response = await fetch(url, { method: "POST" });
  return await response.json();
}
