export interface Country {
  name: string;
  slug: string;
  code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: string[];
  currencies: { name: string; symbol: string }[];
  timezones: string[];
  flag: string;
  coatOfArms: string;
  image: string;
  borders: string[];
  drivingSide: string;
  callingCode: string;
  tld: string;
  independent: boolean;
  unMember: boolean;
  landlocked: boolean;
  gini?: number;
  safetyRating: "low" | "moderate" | "high" | "very-high";
  visaInfo: string;
  bestTimeToVisit: string;
  travelAdvisory: string;
  plugType: string;
  waterSafety: string;
  healthInfo: string;
  emergencyNumber: string;
  lastUpdated: string;
}

export interface USState {
  name: string;
  slug: string;
  abbreviation: string;
  capital: string;
  population: number;
  area: number;
  region: string;
  nickname: string;
  motto: string;
  bird: string;
  flower: string;
  tree: string;
  statehood: string;
  image: string;
  flag: string;
  timezone: string;
  majorCities: string[];
  topAttractions: string[];
  climate: string;
  bestTimeToVisit: string;
  avgTemperature: { summer: string; winter: string };
  costOfLiving: "low" | "moderate" | "high" | "very-high";
  safetyRating: "low" | "moderate" | "high" | "very-high";
  funFact: string;
  lastUpdated: string;
}

export interface SearchResult {
  type: "country" | "state";
  name: string;
  slug: string;
  image: string;
  subtitle: string;
}
