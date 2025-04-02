// app/api/odds/route.js
export async function GET() {
  const url = 'https://odds-api1.p.rapidapi.com/events?tournamentId=17&media=false';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '39a6020f1fmsh52041a2fb6522d4p13b1f0jsn13fe0152b2b8',
      'x-rapidapi-host': 'odds-api1.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Extraer solo los campos deseados
    const filteredData = {
      name: data.name, // "Premier League"
      events: Object.values(data.events).map(event => ({
        eventId: event.eventId,
        match: `${event.participant1} vs ${event.participant2}`,
      })),
    };

    return new Response(JSON.stringify(filteredData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error fetching odds data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}