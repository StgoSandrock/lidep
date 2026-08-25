import Link from "next/link";
import { ArrowRight, BarChart3, Building2, Check, Layers3, ShieldCheck, Trophy, UsersRound, Zap } from "lucide-react";
import { Brand } from "@/components/brand";

const modules = [
  { icon: Trophy, title: "Competencias", text: "Temporadas, torneos, categorías y fixture en una estructura coherente." },
  { icon: UsersRound, title: "Clubes y jugadores", text: "Una base deportiva centralizada que deja atrás planillas fragmentadas." },
  { icon: BarChart3, title: "Resultados y estadísticas", text: "Registra resultados una vez y actualiza posiciones y métricas automáticamente." },
  { icon: Layers3, title: "Portal público", text: "Cada liga obtiene una experiencia pública siempre sincronizada con su operación." },
];

export default function HomePage() {
  return (
    <main className="landing">
      <nav className="landing-nav container">
        <Brand />
        <div className="landing-links"><a href="#producto">Producto</a><a href="#empresa">Empresa</a><a href="#vision">Visión</a></div>
        <div className="nav-actions"><Link href="/liga/liga-escolar-demo" className="button ghost small">Ver liga demo</Link><Link href="/admin" className="button primary small">Abrir demo</Link></div>
      </nav>

      <section className="hero container">
        <div className="hero-copy">
          <span className="hero-pill"><span className="dot" /> Infraestructura tecnológica para organizaciones deportivas</span>
          <h1>La infraestructura digital para <span>administrar tu liga deportiva.</span></h1>
          <p>Centraliza competencias, clubes, jugadores, partidos, resultados y estadísticas desde una sola plataforma.</p>
          <div className="hero-actions"><Link href="/admin" className="button primary">Explorar LIDEP <ArrowRight size={18} /></Link><a href="#producto" className="button ghost">Conocer el producto</a></div>
          <div className="hero-proof"><span><Check size={15} /> Multi-organización</span><span><Check size={15} /> Mobile-first</span><span><Check size={15} /> Preparado para crecer</span></div>
        </div>
        <div className="hero-product">
          <div className="mock-window">
            <div className="mock-bar"><span /><span /><span /><div>LIDEP / Dashboard</div></div>
            <div className="mock-layout">
              <div className="mock-sidebar"><div className="mini-logo">L</div>{[1,2,3,4,5].map(i => <div key={i} className={`mock-nav-line ${i===1?'selected':''}`} />)}</div>
              <div className="mock-content">
                <div className="mock-title"><span>Dashboard</span><small>Temporada 2026</small></div>
                <div className="mock-metrics"><div><b>24</b><span>Partidos</span></div><div><b>8</b><span>Clubes</span></div><div><b>146</b><span>Jugadores</span></div></div>
                <div className="mock-grid"><div className="mock-panel large"><strong>Próximos partidos</strong><div className="mock-match"><span>MAN</span><b>vs</b><span>INT</span></div><div className="mock-match"><span>PAL</span><b>vs</b><span>EST</span></div></div><div className="mock-panel"><strong>Tabla</strong>{[1,2,3,4].map(i => <div className="mock-row" key={i}><span>{i}</span><div/><b>{7-i} pts</b></div>)}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section" id="empresa">
        <div className="container problem-grid">
          <div><span className="section-tag">El problema</span><h2>Una liga no debería funcionar entre cinco herramientas distintas.</h2></div>
          <div className="problem-card"><div className="fragment-tools"><span>Excel</span><span>WhatsApp</span><span>Correo</span><span>PDF</span><span>Formularios</span></div><p>Cuando la información está repartida, cada resultado genera trabajo manual, errores y versiones distintas de la verdad.</p><strong>Toda tu liga debería funcionar desde un solo lugar.</strong></div>
        </div>
      </section>

      <section className="section container" id="producto">
        <div className="section-heading"><span className="section-tag">Producto</span><h2>Una plataforma para operar la competición.</h2><p>LIDEP convierte la administración deportiva en un sistema, no en una colección de archivos.</p></div>
        <div className="module-grid">{modules.map(({icon: Icon, title, text}) => <article className="module-card" key={title}><div className="module-icon"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p><span>Incluido en el núcleo <ArrowRight size={15}/></span></article>)}</div>
      </section>

      <section className="vision-section" id="vision">
        <div className="container vision-grid">
          <div className="vision-statement"><span className="section-tag light">Visión</span><h2>Que cada nueva liga sea configuración y datos, no un nuevo proyecto de desarrollo.</h2><p>LIDEP está pensado desde el inicio como infraestructura SaaS multi-tenant capaz de acompañar a organizaciones pequeñas y escalar a miles de ligas.</p></div>
          <div className="vision-cards"><div><Building2/><strong>Chile primero</strong><span>Validar con ligas escolares y amateur.</span></div><div><Zap/><strong>Latinoamérica después</strong><span>Escalar una arquitectura común.</span></div><div><ShieldCheck/><strong>Infraestructura confiable</strong><span>Seguridad y aislamiento como base.</span></div></div>
        </div>
      </section>

      <footer className="landing-footer container"><Brand/><p>Administra el deporte. LIDEP administra la tecnología.</p><span>v0.1 · Ligas Deportivas</span></footer>
    </main>
  );
}
