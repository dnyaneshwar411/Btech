export function productionStage(stage) {
  return stage
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase())
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function truncate(description, wordLimit = 16) {
  if (!description) return "";
  const words = description.split(" ");
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(" ") + "...";
}