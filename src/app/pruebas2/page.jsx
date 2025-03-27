

async function fetchOdds() {
  const res = await fetch("http://localhost:3000/api/odds", { cache: "no-store" });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch odds");
  }
  return res.json();
}

export default async function Pruebas2() {
  let matches = [];
  let error = null;

  try {
    matches = await fetchOdds();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div >
        <h1>Odds Matcher</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div >
      <h1>Odds Matcher</h1>
      <table >
        <thead>
          <tr>
            <th>FECHA/HORA</th>
            <th>EVENTO</th>
            <th>APUESTA</th>
            <th>RATING (%)</th>
            <th>BOOKMAKER</th>
            <th>FAVOR</th>
            <th>EXCHANGE</th>
            <th>LIQUIDEZ</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td>{match.fechaHora}</td>
              <td>{match.evento}</td>
              <td>{match.apuesta}</td>
              <td>{match.rating}</td>
              <td>{match.bookmaker}</td>
              <td>{match.favor}</td>
              <td>{match.exchange}</td>
              <td>{match.liquidez}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}