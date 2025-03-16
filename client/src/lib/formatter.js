export function productionStage(stage) {
  return stage
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase())
}