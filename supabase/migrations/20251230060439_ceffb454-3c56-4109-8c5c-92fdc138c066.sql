-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create analysis_history table
create table public.analysis_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade,
  file_name text not null,
  overall_score integer not null,
  ats_score integer not null,
  content_score integer not null,
  format_score integer not null,
  analysis_data jsonb not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS on analysis_history
alter table public.analysis_history enable row level security;

-- Analysis history policies
create policy "Users can view own analysis history"
  on public.analysis_history for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own analysis"
  on public.analysis_history for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete own analysis"
  on public.analysis_history for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create indexes for faster queries
create index analysis_history_user_id_idx on public.analysis_history(user_id);
create index analysis_history_created_at_idx on public.analysis_history(created_at desc);