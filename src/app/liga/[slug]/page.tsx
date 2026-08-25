"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, Trophy } from "lucide-react";
import { useDemoStore } from "@/components/demo-store";
import { calculateStandings } from "@/lib/standings";
import { formatDate, teamClub, teamName } from "@/lib/helpers";

export default function PublicLeaguePage() {
  const params = useParams<{ slug: string }>();
  const { db } = useDemoStore();
  const valid = params.slug === db.organization.slug;
  if (!valid) return <main className="not-found-demo"><h1>Liga no encontrada</h1><Link href="/">Volver a LIDEP</Link></main>;
  const category = db.categories[0];
  const teams = db.teams.filter(t=>t.categoryId===category.id);
  const standings = calculateStandings(teams.map(t=>t.id), db.matches.filter(m=>m.categoryId===category.id));
  const upcoming = db.matches.filter(m=>m.status==="scheduled").slice(0,3);
  const recent = db.matches.filter(m=>m.status==="played").slice(-3).reverse();
  return <main className="league-public" style={{"--league-primary": db.organization.primaryColor} as React.CSSProperties}>
    <header className="league-header"><div className="container league-nav"><Link href={`/liga/${db.organization.slug}`} className="league-brand"><span>{db.organization.logoText}</span><div><strong>{db.organization.name}</strong><small>{db.organization.city}</small></div></Link><nav><a href="#partidos">Partidos</a><a href="#tabla">Tabla</a><a href="#clubes">Clubes</a></nav><Link href="/" className="powered">Powered by <b>LIDEP</b></Link></div></header>
    <section className="league-hero"><div className="container"><span className="league-kicker">Temporada 2026 · Fútbol</span><h1>{db.competitions[0].name}</h1><p>Resultados, fixture y posiciones oficiales de {db.organization.name}.</p><div className="league-stats"><div><strong>{db.clubs.length}</strong><span>Clubes</span></div><div><strong>{db.matches.length}</strong><span>Partidos</span></div><div><strong>{db.players.length}</strong><span>Jugadores</span></div></div></div></section>
    <div className="container league-content">
      <section id="partidos"><div className="public-section-head"><div><span>Calendario</span><h2>Próximos partidos</h2></div><CalendarDays/></div><div className="public-match-grid">{upcoming.map(m=><article key={m.id}><div className="public-match-top"><span>Jornada {m.round}</span><strong>{formatDate(m.date)} · {m.time}</strong></div><div className="public-teams"><div><span className="public-club-logo">{teamClub(db,m.homeTeamId)?.initials}</span><b>{teamName(db,m.homeTeamId)}</b></div><em>vs</em><div><span className="public-club-logo">{teamClub(db,m.awayTeamId)?.initials}</span><b>{teamName(db,m.awayTeamId)}</b></div></div><div className="public-venue"><MapPin size={14}/>{m.venue}</div></article>)}</div></section>
      <div className="public-two-col">
        <section id="tabla"><div className="public-section-head"><div><span>Clasificación</span><h2>Tabla · {category.name}</h2></div><Trophy/></div><div className="public-table"><div className="public-table-header"><span>#</span><span>Equipo</span><span>PJ</span><span>DG</span><b>PTS</b></div>{standings.map((r,i)=><div className="public-table-row" key={r.teamId}><span>{i+1}</span><strong>{teamName(db,r.teamId).replace(" Superior","")}</strong><span>{r.played}</span><span>{r.goalDifference>0?`+${r.goalDifference}`:r.goalDifference}</span><b>{r.points}</b></div>)}</div></section>
        <section><div className="public-section-head"><div><span>Últimos partidos</span><h2>Resultados</h2></div><ArrowRight/></div><div className="public-results">{recent.map(m=><div key={m.id}><span>{formatDate(m.date)}</span><strong>{teamName(db,m.homeTeamId).replace(" Superior","")}</strong><b>{m.homeScore} — {m.awayScore}</b><strong>{teamName(db,m.awayTeamId).replace(" Superior","")}</strong></div>)}</div></section>
      </div>
      <section id="clubes"><div className="public-section-head"><div><span>Participantes</span><h2>Clubes</h2></div></div><div className="public-clubs">{db.clubs.map(c=><div key={c.id}><span>{c.initials}</span><strong>{c.shortName}</strong></div>)}</div></section>
    </div>
    <footer className="league-footer"><div className="container"><span>{db.organization.name} · Temporada 2026</span><span>Infraestructura por <b>LIDEP</b></span></div></footer>
  </main>;
}
