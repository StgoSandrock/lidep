"use client";

import { Database, RotateCcw, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useDemoStore } from "@/components/demo-store";

export default function SettingsPage() {
  const { db, resetDemo } = useDemoStore();
  return <>
    <PageHeader eyebrow="Configuración" title="Organización" description="Identidad y estado técnico del espacio de trabajo." />
    <div className="settings-grid">
      <section className="panel"><div className="panel-head"><div><span className="eyebrow">Identidad</span><h2>{db.organization.name}</h2></div><div className="org-avatar large">{db.organization.logoText}</div></div><div className="key-values"><div><span>Slug</span><strong>{db.organization.slug}</strong></div><div><span>Ubicación</span><strong>{db.organization.city}, {db.organization.country}</strong></div><div><span>Plan</span><strong>{db.organization.plan} · prueba</strong></div></div></section>
      <section className="panel security-panel"><ShieldCheck/><span className="eyebrow">Producción</span><h2>Seguridad pendiente de backend</h2><p>Esta versión de código usa estado demo en el navegador. Antes de usar datos reales se activarán autenticación, validación del servidor y RLS por <code>organization_id</code>.</p></section>
      <section className="panel span-2"><div className="panel-head"><div><span className="eyebrow">Datos demo</span><h2>Restablecer entorno</h2></div><Database size={20}/></div><p className="muted">Borra los cambios realizados en esta demostración y recupera los datos iniciales.</p><button className="button danger" onClick={resetDemo}><RotateCcw size={16}/> Restablecer demo</button></section>
    </div>
  </>;
}
