export function formatPopulation(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function formatArea(num: number): string {
  return num.toLocaleString() + " km²";
}

export function getSafetyColor(rating: string): string {
  switch (rating) {
    case "very-high": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "high": return "text-blue-600 bg-blue-50 border-blue-200";
    case "moderate": return "text-amber-600 bg-amber-50 border-amber-200";
    case "low": return "text-red-600 bg-red-50 border-red-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function getSafetyLabel(rating: string): string {
  switch (rating) {
    case "very-high": return "Very Safe";
    case "high": return "Safe";
    case "moderate": return "Moderate";
    case "low": return "Use Caution";
    default: return "Unknown";
  }
}

export function getCostColor(cost: string): string {
  switch (cost) {
    case "very-high": return "text-red-600 bg-red-50 border-red-200";
    case "high": return "text-orange-600 bg-orange-50 border-orange-200";
    case "moderate": return "text-blue-600 bg-blue-50 border-blue-200";
    case "low": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function getCostLabel(cost: string): string {
  switch (cost) {
    case "very-high": return "Very Expensive";
    case "high": return "Expensive";
    case "moderate": return "Moderate";
    case "low": return "Affordable";
    default: return "Unknown";
  }
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
