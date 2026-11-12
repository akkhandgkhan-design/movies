-- ========================================================
-- Supabase SQL Schema for Movie & Web Series Portal
-- Copy and paste this into your Supabase SQL Editor and click RUN
-- ========================================================

-- 1. Create table (agar pehle se bani hui hai to create nahi hogi)
create table if not exists public.movies (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    poster_url text not null,
    content_type text default 'movie',          -- 'movie' ya 'series'
    download_url text,                          -- Movies ke liye direct link
    download_url_backup text,                   -- Movies ke liye backup link
    total_seasons integer default 1,            -- Series ke liye
    total_episodes integer default 1,           -- Series ke liye
    seasons_data jsonb default '[]'::jsonb,     -- Series ke seasons aur har season ke download links
    category text default 'Action',
    quality text default '1080p',
    year text default '2024',
    file_size text default '1.2 GB',
    rating text default '7.5',
    downloads_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Agar table pehle se bani thi to nayi columns add karlein (Safe Alter)
alter table public.movies add column if not exists content_type text default 'movie';
alter table public.movies add column if not exists total_seasons integer default 1;
alter table public.movies add column if not exists total_episodes integer default 1;
alter table public.movies add column if not exists seasons_data jsonb default '[]'::jsonb;

-- 3. Enable Row Level Security (RLS)
alter table public.movies enable row level security;

-- 4. Policies
create policy "Allow public read access"
on public.movies
for select
using (true);

create policy "Allow insert for all"
on public.movies
for insert
with check (true);

create policy "Allow update for all"
on public.movies
for update
using (true);

create policy "Allow delete for all"
on public.movies
for delete
using (true);

-- 5. Insert Sample Movies & Web Series with Seasons
insert into public.movies (title, description, poster_url, content_type, download_url, category, quality, year, file_size, rating)
values 
(
    'Inception', 
    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    'movie',
    'https://example.com/download/inception',
    'Sci-Fi',
    '4K UHD',
    '2010',
    '2.4 GB',
    '8.8'
),
(
    'The Dark Knight', 
    'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    'movie',
    'https://example.com/download/dark-knight',
    'Action',
    '1080p',
    '2008',
    '1.8 GB',
    '9.0'
);

-- Sample Web Series with Multiple Seasons & Season-wise Download Links
insert into public.movies (title, description, poster_url, content_type, total_seasons, total_episodes, seasons_data, category, quality, year, rating)
values 
(
    'Stranger Things',
    'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=800&q=80',
    'series',
    4,
    34,
    '[
        {
            "season_number": 1,
            "title": "Season 1",
            "episodes": "8 Episodes",
            "quality": "1080p",
            "size": "5.4 GB",
            "download_url": "https://example.com/download/stranger-things-s1",
            "download_url_backup": "https://example.com/download/stranger-things-s1-mirror"
        },
        {
            "season_number": 2,
            "title": "Season 2",
            "episodes": "9 Episodes",
            "quality": "1080p",
            "size": "6.1 GB",
            "download_url": "https://example.com/download/stranger-things-s2",
            "download_url_backup": ""
        },
        {
            "season_number": 3,
            "title": "Season 3",
            "episodes": "8 Episodes",
            "quality": "4K UHD",
            "size": "8.2 GB",
            "download_url": "https://example.com/download/stranger-things-s3",
            "download_url_backup": ""
        },
        {
            "season_number": 4,
            "title": "Season 4",
            "episodes": "9 Episodes",
            "quality": "4K UHD",
            "size": "11.5 GB",
            "download_url": "https://example.com/download/stranger-things-s4",
            "download_url_backup": ""
        }
    ]'::jsonb,
    'Sci-Fi',
    '4K UHD',
    '2016-2022',
    '8.7'
);
