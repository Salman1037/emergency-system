export async function getEmergencySuggestions({ title, description, category }) {
  const response = await fetch("/api/grok-suggestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, category }),
  });
  const data = await response.json();
  return data.suggestions || [];
}
