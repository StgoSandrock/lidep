import { DemoDatabase } from "./types";

export function teamName(db: DemoDatabase, id: string) {
  return db.teams.find((team) => team.id === id)?.name ?? "Equipo";
}

export function teamClub(db: DemoDatabase, teamId: string) {
  const team = db.teams.find((item) => item.id === teamId);
  return db.clubs.find((club) => club.id === team?.clubId);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}
