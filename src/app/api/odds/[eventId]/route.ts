// app/api/odds/[eventId]/route.ts
import { NextResponse } from 'next/server';

const API_KEY = '56d93ddeafadd00bb99a29d3914e2825';
const BOOKMAKERS =
  'bet365,pokerstars.es,paf.es,marcaapuestas,leovegas.es,winamax.es,bwin.es,interwetten,betway,tonybet,betfair-ex';

export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  const { eventId } = params;

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