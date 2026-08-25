# LIDEP v0.1

LIDEP (Ligas Deportivas) es una plataforma SaaS para administrar ligas deportivas.

## Estado

Esta primera base implementa una experiencia funcional navegable con datos demo persistidos en el navegador. La arquitectura separa UI, dominio y motor estadístico para migrar a PostgreSQL/Supabase sin rehacer las pantallas.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Rutas principales

- `/` — landing corporativa
- `/admin` — dashboard de organización
- `/admin/competitions` — competición y categorías
- `/admin/matches` — fixture y registro de resultados
- `/admin/clubs` — clubes y altas demo
- `/admin/players` — jugadores y altas demo
- `/liga/liga-escolar-demo` — portal público demo

## Siguiente etapa de producción

1. Supabase/PostgreSQL.
2. Auth real y sesiones seguras.
3. Row Level Security por `organization_id`.
4. Server Actions/API con validación del servidor.
5. Storage para logos y fotos.
6. Dominio `lidep.cl` y subdominios por organización.
