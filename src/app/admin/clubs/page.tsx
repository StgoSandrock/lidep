"use client";

import { FormEvent, useState } from "react";
import { Building2, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";

export default function ClubsPage() {
  const { db, addClub } = useDemoStore();
  const [open, setOpen] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    addClub(String(form.get("name")), String(form.get("shortName")));
    e.currentTarget.reset(); setOpen(false);
  }
  return <>
    <PageHeader eyebrow="Participantes" title="Clubes" description="Organizaciones que forman parte de la liga." action={<button className="button primary small" onClick={()=>setOpen(!open)}><Plus size={16}/> Nuevo club</button>} />
    {open && <form className="panel inline-form" onSubmit={submit}><label>Nombre completo<input required name="name" placeholder="Club Deportivo..."/></label><label>Nombre corto<input required name="shortName" placeholder="Nombre visible"/></label><button className="button primary" type="submit">Crear club</button></form>}
    <div className="club-grid">{db.clubs.map(club => { const teams=db.teams.filter(t=>t.clubId===club.id); return <article className="panel club-card" key={club.id}><div className="club-logo">{club.initials}</div><div><h2>{club.shortName}</h2><p>{club.name}</p></div><div className="club-meta"><span><Building2 size={14}/>{teams.length} equipos</span><span>{db.players.filter(p=>teams.some(t=>t.id===p.teamId)).length} jugadores</span></div></article>})}</div>
  </>;
}
