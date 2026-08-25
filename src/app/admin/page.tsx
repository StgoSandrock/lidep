"use client";

import { Building2, CalendarClock, CircleAlert, Swords, UsersRound } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";
import { formatDate, teamName } from "@/lib/helpers";

export default function DashboardPage() {
  const { db } = useDemoStore();
  const played = db.matches.filter((match) => match.status === "played");
  const pending = db.matches.filter((match) => match.status === "scheduled");
  return (
    <>
      <PageHeader eyebrow="Resumen" title="Dashboard" description="Lo que requiere atención en tu liga, en un solo lugar." />
      <div className="metrics-grid">
        <MetricCard label="Partidos jugados" value={played.length} detail="Temporada activa" icon={Swords} />
        <MetricCard label="Partidos pendientes" value={pending.length} detail="Próximas jornadas" icon={CalendarClock} />
        <MetricCard label="Clubes" value={db.clubs.length} detail={`${db.teams.length} equipos activos`} icon={Building2} />
        <MetricCard label="Jugadores" value={db.players.length} detail="Planteles registrados" icon={UsersRound} />
      </div>
      <div className="dashboard-grid">
        <section className="panel span-2">
          <div className="panel-head"><div><span className="eyebrow">Agenda</span><h2>Próximos partidos</h2></div><span className="status-badge">{pending.length} pendientes</span></div>
          <div className="match-list">{pending.slice(0,4).map((match) => <div className="match-row" key={match.id}><div className="match-date"><strong>{formatDate(match.date)}</strong><span>{match.time} · Jornada {match.round}</span></div><div className="match-teams"><span>{teamName(db, match.homeTeamId)}</span><b>vs</b><span>{teamName(db, match.awayTeamId)}</span></div><span className="venue">{match.venue}</span></div>)}</div>
        </section>
        <section className="panel attention-card">
          <div className="panel-head"><div><span className="eyebrow">Operación</span><h2>Acciones pendientes</h2></div><CircleAlert size={20}/></div>
          <div className="attention-list"><div><b>{pending.length}</b><span>partidos esperando resultado</span></div><div><b>{db.clubs.filter(c => !db.teams.some(t => t.clubId===c.id)).length}</b><span>clubes sin equipo registrado</span></div><div><b>1</b><span>configuración de seguridad pendiente</span></div></div>
        </section>
        <section className="panel span-2">
          <div className="panel-head"><div><span className="eyebrow">Último movimiento</span><h2>Resultados recientes</h2></div></div>
          <div className="results-strip">{played.slice(-3).reverse().map(match => <div className="result-card" key={match.id}><span>{formatDate(match.date)}</span><div><strong>{teamName(db, match.homeTeamId)}</strong><b>{match.homeScore} — {match.awayScore}</b><strong>{teamName(db, match.awayTeamId)}</strong></div><small>Jornada {match.round}</small></div>)}</div>
        </section>
        <section className="panel health-card"><span className="eyebrow">Estado del sistema</span><h2>Datos bajo control</h2><p>La demostración usa almacenamiento local. La capa de producción se conectará a PostgreSQL/Supabase con aislamiento por organización.</p><div className="health-line"><span className="health-dot"/> Motor estadístico operativo</div></section>
      </div>
    </>
  );
}
