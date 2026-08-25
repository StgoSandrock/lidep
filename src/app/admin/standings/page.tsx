"use client";

import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";
import { calculateStandings } from "@/lib/standings";
import { teamName } from "@/lib/helpers";

export default function StandingsPage() {
  const { db } = useDemoStore();
  const category = db.categories[0];
  const teams = db.teams.filter(t=>t.categoryId===category.id);
  const standings = calculateStandings(teams.map(t=>t.id), db.matches.filter(m=>m.categoryId===category.id));
  return <>
    <PageHeader eyebrow="Estadísticas" title="Tabla de posiciones" description="Calculada dinámicamente desde los partidos jugados." action={<span className="status-badge"><BarChart3 size={14}/> {category.name}</span>} />
    <section className="panel"><div className="table-wrap"><table className="data-table standings"><thead><tr><th>Pos.</th><th>Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th></tr></thead><tbody>{standings.map((row,i)=><tr key={row.teamId}><td><span className={`position-chip ${i<3?'top':''}`}>{i+1}</span></td><td><strong>{teamName(db,row.teamId)}</strong></td><td>{row.played}</td><td>{row.won}</td><td>{row.drawn}</td><td>{row.lost}</td><td>{row.goalsFor}</td><td>{row.goalsAgainst}</td><td>{row.goalDifference>0?`+${row.goalDifference}`:row.goalDifference}</td><td><strong className="points">{row.points}</strong></td></tr>)}</tbody></table></div><div className="formula-note">Orden: puntos → diferencia de goles → goles a favor. No se almacenan puntos manualmente.</div></section>
  </>;
}
