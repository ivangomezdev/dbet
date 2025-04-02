// app/api/tournaments/[tournamentId]/route.ts
import { NextResponse } from 'next/server';

const API_KEY = '56d93ddeafadd00bb99a29d3914e2825';

export async function GET(request: Request, { params }: { params: { tournamentId: string } }) {
  const { tournamentId } = params;

  try {
    const url = `https://api.oddspapi.io/api/v3.5/events?tournamentId=${tournamentId}&media=false&API-Key=${API_KEY}`;
    console.log(`Solicitando datos para tournamentId: ${tournamentId}`);
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error en tournamentId ${tournamentId}: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Datos recibidos para tournamentId ${tournamentId}:`, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching tournament ${tournamentId}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}