export type MatchStatus = "scheduled" | "played" | "postponed" | "cancelled";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  primaryColor: string;
  secondaryColor: string;
  country: string;
  city: string;
  plan: "Starter" | "League" | "Pro" | "Enterprise";
  subscriptionStatus: "trial" | "active" | "past_due";
}

export interface Season {
  id: string;
  organizationId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "finished";
}

export interface Competition {
  id: string;
  organizationId: string;
  seasonId: string;
  sport: "football";
  name: string;
  format: "league";
  status: "draft" | "active" | "finished";
}

export interface Category {
  id: string;
  competitionId: string;
  name: string;
}

export interface Club {
  id: string;
  organizationId: string;
  name: string;
  shortName: string;
  initials: string;
}

export interface Team {
  id: string;
  clubId: string;
  competitionId: string;
  categoryId: string;
  name: string;
}

export interface Player {
  id: string;
  organizationId: string;
  teamId: string;
  displayName: string;
  position: string;
  shirtNumber: number;
}

export interface Match {
  id: string;
  organizationId: string;
  competitionId: string;
  categoryId: string;
  seasonId: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  venue: string;
  date: string;
  time: string;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
}

export interface DemoDatabase {
  organization: Organization;
  seasons: Season[];
  competitions: Competition[];
  categories: Category[];
  clubs: Club[];
  teams: Team[];
  players: Player[];
  matches: Match[];
}

export interface StandingRow {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}
