import { REGION_AIRLINES } from "../airlines";

const DUFFEL_API_KEY = process.env.DUFFEL_API_KEY!;
const DUFFEL_API_URL = "https://api.duffel.com/air/offer_requests";

async function fetchIataCode(query: string): Promise<string> {
  try {
    const url = `https://api.duffel.com/places/suggestions?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${DUFFEL_API_KEY}`,
        "Duffel-Version": "v2"
      }
    });
    const json = await res.json();
    if (json.data && json.data.length > 0) {
      return json.data[0].iata_code;
    }
  } catch (error) {
    console.error("Error fetching IATA code from Duffel:", error);
  }
  // Default fallback if a location is completely invalid
  return "LHR";
}

function parseDuration(isoString: string) {
  const match = isoString.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return "Unknown";
  const hours = match[1] ? `${match[1]}h` : "";
  const minutes = match[2] ? `${match[2]}m` : "";
  return `${hours} ${minutes}`.trim();
}

export const flightController = {
  async search(origin: string, destination: string) {
    try {
      const fromIata = await fetchIataCode(origin);
      const toIata = await fetchIataCode(destination);

      // Use a fixed future date for searching (1 month from now)
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      const departDate = date.toISOString().split('T')[0];

      const requestBody = {
        data: {
          slices: [{ origin: fromIata, destination: toIata, departure_date: departDate }],
          passengers: [{ type: "adult" }],
          return_offers: true
        }
      };

      const res = await fetch(DUFFEL_API_URL, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${DUFFEL_API_KEY}`,
          "Duffel-Version": "v2",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      const json = await res.json();

      if (!json.data || !json.data.offers) {
        throw new Error("No flight offers returned from Duffel.");
      }

      // Parse and map the top 5 flight offers
      const flights = json.data.offers.slice(0, 5).map((offer: any) => {
        const slice = offer.slices[0];
        const segment = slice.segments[0];
        const price = Math.round(parseFloat(offer.total_amount));
        let airline = offer.owner?.name || "Unknown Airline";
        
        // --- PORTFOLIO HACK: Replace "Duffel" with real airline names to make UI look beautiful ---
        if (airline.toLowerCase().includes("duffel") || airline === "Unknown Airline") {
          const originLower = origin.toLowerCase();
          const destLower = destination.toLowerCase();
          const routeStr = `${originLower} ${destLower}`;
          
          let realAirlines = ["Emirates", "Qatar Airways", "Turkish Airlines", "Singapore Airlines", "Etihad Airways"];

          for (const [keywords, airlinesList] of Object.entries(REGION_AIRLINES)) {
            const keywordArray = keywords.split(" ");
            if (keywordArray.some(kw => routeStr.includes(kw))) {
              realAirlines.push(...airlinesList);
            }
          }
          
          // Pick a random realistic airline from the aggregated list
          airline = realAirlines[Math.floor(Math.random() * realAirlines.length)];
        }
        // -----------------------------------------------------------------------------------------

        // Format time (e.g. 2026-10-15T12:00:00 -> 12:00)
        const depTime = segment.departing_at.split('T')[1].substring(0, 5);
        const arrTime = segment.arriving_at.split('T')[1].substring(0, 5);

        return {
          id: offer.id,
          airline,
          departureTime: depTime,
          arrivalTime: arrTime,
          duration: parseDuration(slice.duration),
          price,
          currency: offer.total_currency || "USD",
          origin: origin || "Unknown",
          destination
        };
      });

      // Sort by price
      flights.sort((a: any, b: any) => a.price - b.price);

      return flights;
    } catch (error) {
      console.error("Duffel Flight API Error:", error);
      return [];
    }
  }
};
