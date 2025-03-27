export async function GET() {
    const apiKey = process.env.ODDS_API_KEY;
    const sports = ["soccer", "basketball", "tennis"]; // Deportes a consultar
    const results = [];
  
    try {
      for (const sport of sports) {
        const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=eu&markets=h2h,totals`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch odds for ${sport}: ${errorData.message}`);
        }
        const data = await response.json();
  
        const formattedMatches = data.flatMap((match) => {
          const betfair = match.bookmakers.find((b) => b.key === "betfair_ex_eu");
          const sportResults = [];
  
          match.bookmakers.forEach((bookmaker) => {
            if (bookmaker.key === "betfair_ex_eu") return; // Saltar Betfair en "back"
  
            // Mercado h2h (1X2 o ganador)
            const h2hMarket = bookmaker.markets.find((m) => m.key === "h2h");
            const h2hLayMarket = betfair?.markets.find((m) => m.key === "h2h_lay");
            if (h2hMarket) {
              const homeTeamOdds = h2hMarket.outcomes.find((o) => o.name === match.home_team);
              const homeTeamLayOdds = h2hLayMarket?.outcomes.find((o) => o.name === match.home_team);
              if (homeTeamOdds) {
                sportResults.push({
                  fechaHora: new Date(match.commence_time).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  evento: `${match.home_team} v ${match.away_team}`,
                  apuesta: match.home_team, // Equipo/jugador por el que apostar
                  rating: (1 / homeTeamOdds.price * 100).toFixed(2),
                  bookmaker: bookmaker.title,
                  favor: homeTeamOdds.price,
                  contra: homeTeamLayOdds?.price || "N/A",
                  liquidez: "N/A",
                  tiempo: "N/A",
                });
              }
            }
  
            // Mercado totals (Menos de X.5)
            const totalsMarket = bookmaker.markets.find((m) => m.key === "totals");
            const totalsLayMarket = betfair?.markets.find((m) => m.key === "totals_lay");
            if (totalsMarket) {
              const underOutcome = totalsMarket.outcomes.find((o) => o.name === "Under");
              const underLayOutcome = totalsLayMarket?.outcomes.find((o) => o.name === "Under" && o.point === underOutcome?.point);
              if (underOutcome && underOutcome.point) {
                sportResults.push({
                  fechaHora: new Date(match.commence_time).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  evento: `${match.home_team} v ${match.away_team}`,
                  apuesta: `Menos de ${underOutcome.point}`,
                  rating: (1 / underOutcome.price * 100).toFixed(2),
                  bookmaker: bookmaker.title,
                  favor: underOutcome.price,
                  contra: underLayOutcome?.price || "N/A",
                  liquidez: "N/A",
                  tiempo: "N/A",
                });
              }
            }
          });
  
          return sportResults;
        });
  
        results.push(...formattedMatches);
      }
  
      return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error in API Route:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }