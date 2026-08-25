import { DemoDatabase } from "./types";

export const demoDatabase: DemoDatabase = {
  organization: {
    id: "org_demo",
    name: "Liga Escolar Metropolitana",
    slug: "liga-escolar-demo",
    logoText: "LEM",
    primaryColor: "#1f7a4d",
    secondaryColor: "#0e2a20",
    country: "Chile",
    city: "Santiago",
    plan: "League",
    subscriptionStatus: "trial",
  },
  seasons: [
    { id: "season_2026", organizationId: "org_demo", name: "Temporada 2026", startDate: "2026-03-01", endDate: "2026-12-05", status: "active" },
  ],
  competitions: [
    { id: "comp_clausura", organizationId: "org_demo", seasonId: "season_2026", sport: "football", name: "Campeonato Clausura 2026", format: "league", status: "active" },
  ],
  categories: [
    { id: "cat_superior", competitionId: "comp_clausura", name: "Superior" },
    { id: "cat_intermedia", competitionId: "comp_clausura", name: "Intermedia" },
  ],
  clubs: [
    { id: "club_manquehue", organizationId: "org_demo", name: "Club Manquehue", shortName: "Manquehue", initials: "CM" },
    { id: "club_palestino", organizationId: "org_demo", name: "Club Palestino", shortName: "Palestino", initials: "CP" },
    { id: "club_estadio", organizationId: "org_demo", name: "Estadio Español", shortName: "Estadio", initials: "EE" },
    { id: "club_country", organizationId: "org_demo", name: "Country Club", shortName: "Country", initials: "CC" },
    { id: "club_lif", organizationId: "org_demo", name: "Liga Independiente", shortName: "LIF", initials: "LI" },
    { id: "club_inter", organizationId: "org_demo", name: "Inter", shortName: "Inter", initials: "IN" },
  ],
  teams: [
    { id: "team_man_s", clubId: "club_manquehue", competitionId: "comp_clausura", categoryId: "cat_superior", name: "Manquehue Superior" },
    { id: "team_pal_s", clubId: "club_palestino", competitionId: "comp_clausura", categoryId: "cat_superior", name: "Palestino Superior" },
    { id: "team_est_s", clubId: "club_estadio", competitionId: "comp_clausura", categoryId: "cat_superior", name: "Estadio Superior" },
    { id: "team_cou_s", clubId: "club_country", competitionId: "comp_clausura", categoryId: "cat_superior", name: "Country Superior" },
    { id: "team_lif_s", clubId: "club_lif", competitionId: "comp_clausura", categoryId: "cat_superior", name: "LIF Superior" },
    { id: "team_int_s", clubId: "club_inter", competitionId: "comp_clausura", categoryId: "cat_superior", name: "Inter Superior" },
  ],
  players: [
    { id: "p1", organizationId: "org_demo", teamId: "team_man_s", displayName: "Tomás Pérez", position: "Delantero", shirtNumber: 9 },
    { id: "p2", organizationId: "org_demo", teamId: "team_man_s", displayName: "Martín Soto", position: "Mediocampista", shirtNumber: 10 },
    { id: "p3", organizationId: "org_demo", teamId: "team_pal_s", displayName: "Vicente Silva", position: "Delantero", shirtNumber: 11 },
    { id: "p4", organizationId: "org_demo", teamId: "team_est_s", displayName: "Lucas González", position: "Defensa", shirtNumber: 4 },
    { id: "p5", organizationId: "org_demo", teamId: "team_cou_s", displayName: "Benjamín Díaz", position: "Arquero", shirtNumber: 1 },
  ],
  matches: [
    { id: "m1", organizationId: "org_demo", competitionId: "comp_clausura", categoryId: "cat_superior", seasonId: "season_2026", round: 1, homeTeamId: "team_man_s", awayTeamId: "team_pal_s", venue: "Club Manquehue", date: "2026-08-08", time: "10:30", status: "played", homeScore: 3, awayScore: 1 },
    { id: "m2", organizationId: "org_demo", competitionId: "comp_clausura", categoryId: "cat_superior", seasonId: "season_2026", round: 1, homeTeamId: "team_est_s", awayTeamId: "team_cou_s", venue: "Estadio Español", date: "2026-08-08", time: "12:00", status: "played", homeScore: 2, awayScore: 2 },
    { id: "m3", organizationId: "org_demo", competitionId: "comp_clausura", categoryId: "cat_superior", seasonId: "season_2026", round: 1, homeTeamId: "team_lif_s", awayTeamId: "team_int_s", venue: "LIF", date: "2026-08-09", time: "11:00", status: "played", homeScore: 0, awayScore: 1 },
    { id: "m4", organizationId: "org_demo", competitionId: "comp_clausura", categoryId: "cat_superior", seasonId: "season_2026", round: 2, homeTeamId: "team_pal_s", awayTeamId: "team_est_s", venue: "Club Palestino", date: "2026-08-29", time: "10:30", status: "scheduled", homeScore: null, awayScore: null },
    { id: "m5", organizationId: "org_demo", competitionId: "comp_clausura", categoryId: "cat_superior", seasonId: "season_2026", round: 2, homeTeamId: "team_int_s", awayTeamId: "team_man_s", venue: "Inter", date: "2026-08-29", time: "12:00", status: "scheduled", homeScore: null, awayScore: null },
    { id: "m6", organizationId: "org_demo", competitionId: "comp_clausura", categoryId: "cat_superior", seasonId: "season_2026", round: 2, homeTeamId: "team_cou_s", awayTeamId: "team_lif_s", venue: "Country Club", date: "2026-08-30", time: "11:00", status: "scheduled", homeScore: null, awayScore: null },
  ],
};
