export const PLAN_LABELS: Record<string, string> = {
  regular: "Regular Home Cleaning",
  spring: "Spring / Deep Cleaning",
  vacate: "Vacate / End of Lease",
  office: "Office / Commercial",
  carpet: "Carpet & Upholstery",
  tile: "Tile & Grout",
  pressure: "Pressure Cleaning",
  custom: "Custom Request",
};

export const STATUS_META: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  reviewing: { label: "Reviewing", color: "bg-amber-100 text-amber-800" },
  quote_sent: { label: "Quote Sent", color: "bg-purple-100 text-purple-800" },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-800" },
  declined: { label: "Declined", color: "bg-red-100 text-red-800" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800" },
  archived: { label: "Archived", color: "bg-gray-100 text-gray-600" },
};

export const ROOM_LABELS: Record<string, string> = {
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  showers: "Showers",
  toilets: "Toilets",
  kitchens: "Kitchens",
  floors: "Floors / Levels",
  livingAreas: "Living Areas",
  bedsToMake: "Beds to Make",
};

export const COMMERCIAL_LABELS: Record<string, string> = {
  workstations: "Workstations",
  meetingRooms: "Meeting Rooms",
  receptionAreas: "Reception Areas",
  sharedAreas: "Shared Areas",
  warehouseArea: "Warehouse Area",
  afterHours: "After Hours",
};

export const EXTRA_LABELS: Record<string, string> = {
  interiorWindows: "Interior windows",
  exteriorWindows: "Exterior windows",
  oven: "Oven cleaning",
  fridge: "Fridge inside",
  cabinets: "Cabinets inside",
  walls: "Walls spot cleaning",
  blinds: "Blinds dusting",
  balcony: "Balcony / patio",
  garage: "Garage sweep",
  carpetSteam: "Carpet steam cleaning",
  tileGrout: "Tile & grout",
  upholstery: "Upholstery cleaning",
  mattress: "Mattress cleaning",
  laundry: "Laundry / ironing",
  dishes: "Dishes",
  bedsLinen: "Beds & linen change",
  petHair: "Pet hair removal",
  mould: "Mould treatment",
  polish: "Furniture polishing",
  other: "Other",
};

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
