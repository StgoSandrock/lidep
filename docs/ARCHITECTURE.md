# Arquitectura LIDEP v0.1

## Principio

LIDEP es un SaaS multi-tenant. Cada registro deportivo pertenece a una organización mediante `organization_id`. La UI nunca es la frontera de seguridad: la autorización real debe vivir en PostgreSQL/RLS y en las acciones del servidor.

## Capas

- `src/app`: rutas y experiencias (corporativa, administración y portal público).
- `src/components`: componentes visuales y estado de demostración.
- `src/lib/types.ts`: contrato del dominio.
- `src/lib/standings.ts`: motor estadístico puro, independiente de React y de la base de datos.
- `supabase/migrations`: esquema relacional y políticas de aislamiento.

## Multi-tenancy

Todas las entidades sensibles tienen `organization_id`. Los usuarios se vinculan a organizaciones mediante `organization_members` y las políticas RLS validan esa membresía.

## Transición de demo a producción

La UI actual usa `DemoProvider` + `localStorage` para que el producto pueda probarse sin infraestructura externa. En producción se reemplaza ese proveedor por un repositorio de datos Supabase/Server Actions. El motor estadístico y las pantallas no necesitan cambiar de estructura.

## Regla de posiciones

El motor calcula la tabla desde partidos jugados:

1. Puntos.
2. Diferencia de goles.
3. Goles a favor.

No se almacenan puntos de tabla como fuente primaria.
