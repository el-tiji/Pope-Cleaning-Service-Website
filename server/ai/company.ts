/** Canonical company facts used in prompts and static tools. */
export const COMPANY = {
  name: "Pope Cleaning Services",
  tagline: "Family-owned cleaning company servicing the Perth metro area",
  phoneKevin: "0423 258 795",
  phoneGenny: "0431 450 293",
  whatsappNumber: "61423258795",
  email: "popecleaningservices@hotmail.com",
  abn: "47 915 716 425",
  serviceArea: "Perth metropolitan area, Western Australia",
  yearsExperience: "7+ years",
  quotePagePath: "/quote",
};

export interface ServiceSummary {
  id: string;
  name: string;
  summary: string;
}

export const SERVICES: ServiceSummary[] = [
  {
    id: "regular",
    name: "Residential / Regular Home Cleaning",
    summary:
      "Routine cleaning for ongoing home maintenance — kitchens, bathrooms, dusting, vacuuming and mopping. Available weekly, fortnightly, monthly or one-off.",
  },
  {
    id: "spring",
    name: "Spring / Deep Cleaning",
    summary:
      "Detailed top-to-bottom cleaning for built-up dust, neglected areas or a seasonal refresh, including skirting boards, door frames and hard-to-reach spots.",
  },
  {
    id: "vacate",
    name: "Vacate / End of Lease Cleaning",
    summary:
      "Move-out cleaning to help prepare the property for final inspection, backed by a 100% Bond Back Guarantee (re-clean of agent-flagged areas).",
  },
  {
    id: "carpet",
    name: "Carpet & Upholstery Cleaning",
    summary:
      "Professional steam cleaning for carpets, rugs, couches and upholstery to lift stains, odours and allergens.",
  },
  {
    id: "tile",
    name: "Tile & Grout Cleaning",
    summary:
      "Deep cleaning for tiles, grout lines, bathrooms and hard floors to restore their original look.",
  },
  {
    id: "office",
    name: "Office / Commercial Cleaning",
    summary:
      "Reliable cleaning for offices, workplaces and commercial spaces, with after-hours availability.",
  },
  {
    id: "pressure",
    name: "Pressure Cleaning",
    summary:
      "Outdoor pressure cleaning for driveways, patios, paths and selected exterior surfaces.",
  },
];
