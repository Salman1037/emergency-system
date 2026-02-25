// Rule-based priority classification for complaints

const HIGH_PRIORITY_KEYWORDS = [
  "fire", "gun", "bleeding", "accident", "attack", "explosion", "emergency", "urgent", "danger", "shooting", "stab", "assault"
];
const MEDIUM_PRIORITY_KEYWORDS = [
  "water", "road", "street light", "electricity", "sewage", "garbage", "pothole", "traffic"
];
const LOW_PRIORITY_KEYWORDS = [
  "suggestion", "feedback", "minor", "noise", "compliment", "request"
];

export function classifyPriority(text) {
  if (!text) return "NORMAL";
  const lower = text.toLowerCase();
  for (const word of HIGH_PRIORITY_KEYWORDS) if (lower.includes(word)) return "HIGH";
  for (const word of MEDIUM_PRIORITY_KEYWORDS) if (lower.includes(word)) return "MEDIUM";
  for (const word of LOW_PRIORITY_KEYWORDS) if (lower.includes(word)) return "LOW";
  return "NORMAL";
}
