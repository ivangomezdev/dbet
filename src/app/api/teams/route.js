// app/api/teams/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get("teamName");
  const apiKey = process.env.THESPORTSDB_API_KEY || "3";

  if (!teamName) {
    return NextResponse.json({ error: "Team name is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/${apiKey}/searchteams.php?t=${encodeURIComponent(teamName)}`
    );
    if (!response.ok) {
      throw new Error(`TheSportsDB API error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.teams || data.teams.length === 0) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const team = data.teams[0];
    const logoUrl = team.strBadge || null;

    if (!logoUrl) {
      return NextResponse.json({ error: "Logo not available" }, { status: 404 });
    }

    return NextResponse.json({ teamName: team.strTeam, logoUrl });
  } catch (error) {
    console.error(`Error fetching team logo for ${teamName}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}