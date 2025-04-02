import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_KEY = '56d93ddeafadd00bb99a29d3914e2825';

export async function GET(request: NextRequest) {
  // Extraemos el tournamentId de la URL
  const url = new URL(request.url);
  const tournamentId = url.pathname.split('/').pop(); // Obtiene el último segmento de la ruta

  if (!tournamentId) {
    return NextResponse.json(
      { error: 'No se proporcionó tournamentId en la URL' },
      { status: 400 }
    );
  }

  try {
    const apiUrl = `https://api.oddspapi.io/api/v3.5/events?tournamentId=${tournamentId}&media=false&API-Key=${API_KEY}`;
    console.log(`Solicitando datos para tournamentId: ${tournamentId}`);
    const response = await fetch(apiUrl);

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