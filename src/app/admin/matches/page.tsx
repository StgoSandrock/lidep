"use client";

import { useState } from "react";
import { CalendarDays, Save } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";
import { formatDate, teamName } from "@/lib/helpers";

function ScoreEditor({ matchId, home, away }: { matchId: string; home: string; away: string }) {
  const { updateMatchResult } = useDemoStore();
  const [homeScore, setHomeScore] = useState("0");
  const [awayScore, setAwayScore] = useState("0");
  return <div className="score-editor"><input aria-label={`Goles ${home}`} type="number" min="0" value={homeScore} onChange={e=>setHomeScore(e.target.value)}/><span>—</span><input aria-label={`Goles ${away}`} type="number" min="0" value={awayScore} onChange={e=>setAwayScore(e.target.value)}/><button className="icon-button" title="Guardar resultado" onClick={()=>updateMatchResult(matchId, Number(homeScore), Number(awayScore))}><Save size={16}/></button></div>;
}

export default function MatchesPage() {
  const { db } = useDemoStore();
  const rounds = [...new Set(db.matches.map(m=>m.round))].sort();
  return <>
    <PageHeader eyebrow="Competición" title="Partidos" description="Consulta el fixture e ingresa resultados. La tabla se recalcula automáticamente." action={<span className="status-badge"><CalendarDays size={14}/> {db.matches.length} partidos</span>} />
    <div className="round-stack">{rounds.map(round => <section className="panel" key={round}><div className="panel-head"><div><span className="eyebrow">Fixture</span><h2>Jornada {round}</h2></div></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Fecha</th><th>Local</th><th>Resultado</th><th>Visitante</th><th>Cancha</th><th>Estado</th></tr></thead><tbody>{db.matches.filter(m=>m.round===round).map(match=>{const home=teamName(db, match.homeTeamId), away=teamName(db, match.awayTeamId); return <tr key={match.id}><td><strong>{formatDate(match.date)}</strong><span className="cell-sub">{match.time}</span></td><td>{home}</td><td>{match.status === "played" ? <strong className="final-score">{match.homeScore} — {match.awayScore}</strong> : <ScoreEditor matchId={match.id} home={home} away={away}/>}</td><td>{away}</td><td>{match.venue}</td><td><span className={`status-dot-text ${match.status}`}>{match.status === "played" ? "Jugado" : "Programado"}</span></td></tr>})}</tbody></table></div></section>)}</div>
  </>;
}
