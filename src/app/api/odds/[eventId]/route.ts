import { NextResponse } from 'next/server';

// Definimos las constantes fuera de la función
const API_KEY = '56d93ddeafadd00bb99a29d3914e2825';
const BOOKMAKERS =
  'bet365,pokerstars.es,paf.es,marcaapuestas,leovegas.es,winamax.es,bwin.es,interwetten,betway,tonybet,betfair-ex';

// Tipamos explícitamente el handler GET según la App Router
export async function GET(
  request: Request,
  context: { params: { eventId: string } }
) {
  const { eventId } = context.params;
    console.log(request);
    
  try {
    const url = `https://api.oddspapi.io/api/v3.5/odds?eventId=${eventId}&bookmakers=${BOOKMAKERS}&API-Key=${API_KEY}`;
    console.log(`Solicitando odds para eventId: ${eventId}`);
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error en eventId ${eventId}: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Odds recibidas para eventId ${eventId}:`, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching odds for eventId ${eventId}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}