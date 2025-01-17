const baseUrl = "http://localhost:8080";

export async function fetchAllPizzas() {
  const response = await fetch(`${baseUrl}/pizzas`);
  if (!response.ok) {
    throw new Error("Fejl ved hentning af leveringer");
  }
  return await response.json();
}