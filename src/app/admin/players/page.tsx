"use client";

import { FormEvent, useState } from "react";
import { Plus, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";
import { teamName } from "@/lib/helpers";

export default function PlayersPage() {
  const { db, addPlayer } = useDemoStore();
  const [open, setOpen] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    addPlayer(String(f.get("name")), String(f.get("teamId")), String(f.get("position")), Number(f.get("number")));
    e.currentTarget.reset(); setOpen(false);
  }
  return <>
    <PageHeader eyebrow="Participantes" title="Jugadores" description="Planteles registrados para la temporada activa." action={<button className="button primary small" onClick={()=>setOpen(!open)}><Plus size={16}/> Nuevo jugador</button>} />
    {open && <form className="panel player-form" onSubmit={submit}><label>Nombre<input name="name" required placeholder="Nombre y apellido"/></label><label>Equipo<select name="teamId" required>{db.teams.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label><label>Posición<select name="position"><option>Arquero</option><option>Defensa</option><option>Mediocampista</option><option>Delantero</option></select></label><label>Número<input name="number" required type="number" min="1" max="99"/></label><button className="button primary" type="submit">Registrar</button></form>}
    <section className="panel"><div className="panel-head"><div><span className="eyebrow">Base de jugadores</span><h2>{db.players.length} registrados</h2></div><UsersRound size={20}/></div><div className="table-wrap"><table className="data-table"><thead><tr><th>#</th><th>Jugador</th><th>Equipo</th><th>Posición</th></tr></thead><tbody>{db.players.map(p=><tr key={p.id}><td><strong>{p.shirtNumber}</strong></td><td>{p.displayName}</td><td>{teamName(db,p.teamId)}</td><td>{p.position}</td></tr>)}</tbody></table></div></section>
  </>;
}
