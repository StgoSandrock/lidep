"use client";

import { CheckCircle2, Flag, Layers3, Trophy } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";

export default function CompetitionsPage() {
  const { db } = useDemoStore();
  const competition = db.competitions[0];
  const season = db.seasons.find(s => s.id === competition.seasonId)!;
  return <>
    <PageHeader eyebrow="Competición" title={competition.name} description="Estructura de la temporada y sus divisiones." />
    <div className="detail-grid">
      <section className="panel hero-detail"><div className="detail-icon"><Trophy/></div><div><span className="eyebrow">Torneo activo</span><h2>{competition.name}</h2><p>Fútbol · Formato liga · Temporada vinculada</p></div><span className="status-badge success"><CheckCircle2 size={14}/> Activo</span></section>
      <section className="panel"><div className="panel-head"><div><span className="eyebrow">Temporada</span><h2>{season.name}</h2></div><Flag size={20}/></div><div className="key-values"><div><span>Inicio</span><strong>{season.startDate}</strong></div><div><span>Término</span><strong>{season.endDate}</strong></div><div><span>Estado</span><strong>Activa</strong></div></div></section>
      <section className="panel span-2"><div className="panel-head"><div><span className="eyebrow">Divisiones</span><h2>Categorías</h2></div><Layers3 size={20}/></div><div className="category-grid">{db.categories.map((cat, index)=><div className="category-card" key={cat.id}><span>0{index+1}</span><strong>{cat.name}</strong><small>{db.teams.filter(t=>t.categoryId===cat.id).length} equipos</small></div>)}</div></section>
    </div>
  </>;
}
