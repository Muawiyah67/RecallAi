-- Subjects: top-level study subjects, each owned by exactly one user.
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  color text not null default '#6366f1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subjects_user_id_idx on public.subjects(user_id);

-- Documents: files uploaded into a subject.
--
-- pages is nullable on purpose — it can't be known until real text
-- extraction runs, unlike the frontend's current Math.random() stand-in.
-- size_kb has no such excuse, since it's already wired to the real
-- uploaded File's .size on the frontend.
--
-- user_id is duplicated from the parent subject (see note above the SQL)
-- so RLS can check ownership directly on this table too.
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  filename text not null,
  storage_path text not null,
  size_kb integer not null,
  pages integer,
  status text not null default 'uploading'
    check (status in ('uploading', 'processing', 'ready', 'failed')),
  uploaded_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists documents_subject_id_idx on public.documents(subject_id);
create index if not exists documents_user_id_idx on public.documents(user_id);

-- Keep updated_at honest on every edit, instead of relying on application
-- code to remember to set it.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger subjects_set_updated_at
  before update on public.subjects
  for each row execute function public.set_updated_at();

create trigger documents_set_updated_at
  before update on public.documents
  for each row execute function public.set_updated_at();

-- Row Level Security — without this, the anon key (which the frontend
-- effectively acts through once you're authenticated) could read or write
-- ANY row in these tables, not just the signed-in user's own. This is the
-- actual enforcement layer, not just a nice-to-have.
alter table public.subjects enable row level security;
alter table public.documents enable row level security;

create policy "Users can view their own subjects"
  on public.subjects for select
  using (auth.uid() = user_id);

create policy "Users can create their own subjects"
  on public.subjects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own subjects"
  on public.subjects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own subjects"
  on public.subjects for delete
  using (auth.uid() = user_id);

create policy "Users can view their own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can create their own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own documents"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "Users can delete their own documents"
  on public.documents for delete
  using (auth.uid() = user_id);