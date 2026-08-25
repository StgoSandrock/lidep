"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, CalendarDays, LayoutDashboard, Settings, ShieldCheck, Trophy, UsersRound } from "lucide-react";
import { Brand } from "./brand";
import { useDemoStore } from "./demo-store";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/competitions", label: "Competición", icon: Trophy },
  { href: "/admin/matches", label: "Partidos", icon: CalendarDays },
  { href: "/admin/clubs", label: "Clubes", icon: Building2 },
  { href: "/admin/players", label: "Jugadores", icon: UsersRound },
  { href: "/admin/standings", label: "Tabla", icon: BarChart3 },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { db } = useDemoStore();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand"><Brand href="/admin" /></div>
        <nav className="sidebar-nav">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link ${active ? "active" : ""}`}>
                <Icon size={18} strokeWidth={1.9} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <div className="org-mini">
            <div className="org-avatar">{db.organization.logoText}</div>
            <div><strong>{db.organization.name}</strong><span>Plan {db.organization.plan}</span></div>
          </div>
          <div className="security-note"><ShieldCheck size={15} /> Modo demo local</div>
        </div>
      </aside>
      <main className="app-main">
        <header className="app-topbar">
          <div>
            <span className="eyebrow">Organización</span>
            <strong>{db.organization.name}</strong>
          </div>
          <div className="topbar-actions">
            <Link className="button ghost small" href={`/liga/${db.organization.slug}`}>Ver portal público</Link>
            <div className="user-chip">SS</div>
          </div>
        </header>
        <div className="app-content">{children}</div>
      </main>
    </div>
  );
}
