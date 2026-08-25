"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoDatabase } from "@/lib/demo-data";
import { Club, DemoDatabase, Match, Player } from "@/lib/types";

const STORAGE_KEY = "lidep_demo_db_v01";

type DemoStore = {
  db: DemoDatabase;
  updateMatchResult: (matchId: string, homeScore: number, awayScore: number) => void;
  addClub: (name: string, shortName: string) => void;
  addPlayer: (displayName: string, teamId: string, position: string, shirtNumber: number) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoStore | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DemoDatabase>(demoDatabase);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setDb(JSON.parse(raw));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }, [db]);

  const value = useMemo<DemoStore>(() => ({
    db,
    updateMatchResult(matchId, homeScore, awayScore) {
      setDb((current) => ({
        ...current,
        matches: current.matches.map((match): Match =>
          match.id === matchId ? { ...match, homeScore, awayScore, status: "played" } : match
        ),
      }));
    },
    addClub(name, shortName) {
      const id = `club_${Date.now()}`;
      const initials = shortName.split(/\s+/).map((part) => part[0]).join("").slice(0, 3).toUpperCase();
      const club: Club = { id, organizationId: db.organization.id, name, shortName, initials };
      setDb((current) => ({ ...current, clubs: [...current.clubs, club] }));
    },
    addPlayer(displayName, teamId, position, shirtNumber) {
      const player: Player = {
        id: `player_${Date.now()}`,
        organizationId: db.organization.id,
        displayName,
        teamId,
        position,
        shirtNumber,
      };
      setDb((current) => ({ ...current, players: [...current.players, player] }));
    },
    resetDemo() {
      setDb(demoDatabase);
      window.localStorage.removeItem(STORAGE_KEY);
    },
  }), [db]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoStore() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemoStore must be used within DemoProvider");
  return context;
}
