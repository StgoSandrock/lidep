-- LIDEP v0.1 · núcleo relacional multi-tenant
-- PostgreSQL / Supabase

create extension if not exists pgcrypto;

do $$ begin
  create type public.organization_role as enum ('owner','admin','member');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.match_status as enum ('scheduled','played','postponed','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.match_event_type as enum ('goal','yellow_card','red_card','assist','substitution','own_goal','penalty_goal','penalty_missed');
exception when duplicate_object then null; end $$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  primary_color text not null default '#1f7a4d',
  secondary_color text not null default '#0e2a20',
  country text,
  city text,
  website text,
  custom_domain text unique,
  plan text not null default 'Starter',
  subscription_status text not null default 'trial',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.organization_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (organization_id,user_id)
);

create table if not exists public.seasons (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  start_date date,
  end_date date,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sports (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null
);

insert into public.sports(code,name) values ('football','Fútbol') on conflict (code) do nothing;

create table if not exists public.competitions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete cascade,
  sport_id uuid not null references public.sports(id),
  name text not null,
  description text,
  format text not null default 'league',
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  competition_id uuid not null references public.competitions(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  short_name text,
  logo_url text,
  description text,
  website text,
  instagram text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  club_id uuid not null references public.clubs(id) on delete cascade,
  competition_id uuid not null references public.competitions(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  first_name text,
  last_name text,
  display_name text not null,
  birth_date date,
  nationality text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- La relación histórica evita ligar permanentemente un jugador a un club.
create table if not exists public.team_players (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete cascade,
  position text,
  shirt_number integer check (shirt_number is null or shirt_number between 0 and 999),
  joined_at date,
  left_at date,
  created_at timestamptz not null default now(),
  unique(team_id,player_id,season_id)
);

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  address text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  competition_id uuid not null references public.competitions(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete cascade,
  round integer not null check (round > 0),
  home_team_id uuid not null references public.teams(id),
  away_team_id uuid not null references public.teams(id),
  venue_id uuid references public.venues(id) on delete set null,
  match_date date not null,
  match_time time,
  status public.match_status not null default 'scheduled',
  home_score integer check (home_score is null or home_score >= 0),
  away_score integer check (away_score is null or away_score >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint teams_are_different check (home_team_id <> away_team_id),
  constraint played_requires_score check (status <> 'played' or (home_score is not null and away_score is not null))
);

create table if not exists public.match_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  match_id uuid not null references public.matches(id) on delete cascade,
  team_id uuid not null references public.teams(id),
  player_id uuid references public.players(id) on delete set null,
  type public.match_event_type not null,
  minute integer check (minute is null or minute >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists organization_members_user_idx on public.organization_members(user_id);
create index if not exists seasons_org_idx on public.seasons(organization_id);
create index if not exists competitions_org_idx on public.competitions(organization_id);
create index if not exists competitions_season_idx on public.competitions(season_id);
create index if not exists categories_org_idx on public.categories(organization_id);
create index if not exists clubs_org_idx on public.clubs(organization_id);
create index if not exists teams_org_idx on public.teams(organization_id);
create index if not exists teams_comp_category_idx on public.teams(competition_id,category_id);
create index if not exists players_org_idx on public.players(organization_id);
create index if not exists team_players_org_idx on public.team_players(organization_id);
create index if not exists team_players_player_idx on public.team_players(player_id);
create index if not exists venues_org_idx on public.venues(organization_id);
create index if not exists matches_org_idx on public.matches(organization_id);
create index if not exists matches_comp_category_idx on public.matches(competition_id,category_id);
create index if not exists matches_date_idx on public.matches(match_date);
create index if not exists match_events_org_idx on public.match_events(organization_id);
create index if not exists match_events_match_idx on public.match_events(match_id);

create or replace function public.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.organization_members m
    where m.organization_id = target_org and m.user_id = auth.uid()
  );
$$;

create or replace function public.is_org_admin(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.organization_members m
    where m.organization_id = target_org
      and m.user_id = auth.uid()
      and m.role in ('owner','admin')
  );
$$;

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.seasons enable row level security;
alter table public.competitions enable row level security;
alter table public.categories enable row level security;
alter table public.clubs enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.team_players enable row level security;
alter table public.venues enable row level security;
alter table public.matches enable row level security;
alter table public.match_events enable row level security;

create policy organizations_read on public.organizations
for select using (is_public or public.is_org_member(id));

create policy organizations_update on public.organizations
for update using (public.is_org_admin(id)) with check (public.is_org_admin(id));

create policy organization_members_read on public.organization_members
for select using (public.is_org_member(organization_id));

create policy organization_members_write on public.organization_members
for all using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy seasons_read on public.seasons for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy seasons_write on public.seasons for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy competitions_read on public.competitions for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy competitions_write on public.competitions for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy categories_read on public.categories for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy categories_write on public.categories for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy clubs_read on public.clubs for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy clubs_write on public.clubs for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy teams_read on public.teams for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy teams_write on public.teams for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy players_read on public.players for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy players_write on public.players for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy team_players_read on public.team_players for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy team_players_write on public.team_players for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy venues_read on public.venues for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy venues_write on public.venues for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy matches_read on public.matches for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy matches_write on public.matches for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy match_events_read on public.match_events for select
using (public.is_org_member(organization_id) or exists(select 1 from public.organizations o where o.id=organization_id and o.is_public));
create policy match_events_write on public.match_events for all
using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));
