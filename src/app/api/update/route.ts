import { NextResponse } from "next/server";

interface RestCountryResponse {
  name: { common: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  timezones: string[];
  flags: { png: string; svg: string };
  coatOfArms?: { png?: string };
  borders?: string[];
  car?: { side: string };
  idd?: { root: string; suffixes?: string[] };
  tld?: string[];
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
  cca2: string;
}

export async function GET() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,area,languages,currencies,timezones,flags,coatOfArms,borders,car,idd,tld,independent,unMember,landlocked,cca2", {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`REST Countries API returned ${response.status}`);
    }

    const data: RestCountryResponse[] = await response.json();

    const countries = data
      .filter((c) => c.population > 0)
      .sort((a, b) => b.population - a.population)
      .slice(0, 50)
      .map((c) => ({
        name: c.name.common,
        code: c.cca2,
        capital: c.capital?.[0] || "N/A",
        region: c.region,
        subregion: c.subregion || "",
        population: c.population,
        area: c.area,
        languages: c.languages ? Object.values(c.languages) : [],
        currencies: c.currencies
          ? Object.values(c.currencies).map((cur) => ({
              name: cur.name,
              symbol: cur.symbol || "",
            }))
          : [],
        timezones: c.timezones,
        flag: c.flags.png,
        coatOfArms: c.coatOfArms?.png || "",
        borders: c.borders || [],
        drivingSide: c.car?.side || "right",
        callingCode: c.idd?.root
          ? `${c.idd.root}${c.idd.suffixes?.[0] || ""}`
          : "",
        tld: c.tld?.[0] || "",
        independent: c.independent ?? false,
        unMember: c.unMember ?? false,
        landlocked: c.landlocked ?? false,
        lastUpdated: new Date().toISOString(),
      }));

    return NextResponse.json({
      success: true,
      count: countries.length,
      lastUpdated: new Date().toISOString(),
      data: countries,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch data",
        lastUpdated: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
