import { Match, StandingRow } from "./types";

export function calculateStandings(teamIds: string[], matches: Match[]): StandingRow[] {
  const table = new Map<string, StandingRow>();

  teamIds.forEach((teamId) => {
    table.set(teamId, {
      teamId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  });

  matches.filter((m) => m.status === "played" && m.homeScore !== null && m.awayScore !== null).forEach((match) => {
    const home = table.get(match.homeTeamId);
    const away = table.get(match.awayTeamId);
    if (!home || !away) return;

    home.played += 1;
    away.played += 1;
    home.goalsFor += match.homeScore!;
    home.goalsAgainst += match.awayScore!;
    away.goalsFor += match.awayScore!;
    away.goalsAgainst += match.homeScore!;

    if (match.homeScore! > match.awayScore!) {
      home.won += 1;
      away.lost += 1;
      home.points += 3;
    } else if (match.homeScore! < match.awayScore!) {
      away.won += 1;
      home.lost += 1;
      away.points += 3;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  const rows = [...table.values()].map((row) => ({
    ...row,
    goalDifference: row.goalsFor - row.goalsAgainst,
  }));

  return rows.sort((a, b) =>
    b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor
  );
}
