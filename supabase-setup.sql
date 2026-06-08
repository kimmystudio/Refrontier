-- ════════════════════════════════════════════════════════════════
--  Refrontier 방명록 — Supabase 초기 설정 SQL
--  Supabase 대시보드 → 왼쪽 메뉴 SQL Editor → 새 쿼리에 붙여넣고 RUN
-- ════════════════════════════════════════════════════════════════

-- 1) 방명록 테이블 ------------------------------------------------
create table if not exists public.guestbook (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text,
  message     text not null check (char_length(message) between 1 and 500),
  image_url   text
);

-- 2) RLS (행 수준 보안) 켜기 -------------------------------------
alter table public.guestbook enable row level security;

-- 누구나 읽을 수 있음
create policy "guestbook read for all"
  on public.guestbook for select
  to anon, authenticated
  using (true);

-- 누구나 글을 남길 수 있음 (방문객은 로그인하지 않으므로 anon 허용)
create policy "guestbook insert for all"
  on public.guestbook for insert
  to anon, authenticated
  with check (char_length(message) between 1 and 500);

-- (참고) 수정/삭제 정책은 만들지 않았습니다.
--  → 부적절한 글은 본인이 대시보드 Table Editor 에서 직접 삭제하면 됩니다.


-- 3) 이미지 저장용 Storage 버킷 ----------------------------------
insert into storage.buckets (id, name, public)
values ('guestbook', 'guestbook', true)
on conflict (id) do nothing;

-- 버킷 이미지 공개 읽기
create policy "guestbook images public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'guestbook');

-- 누구나 버킷에 업로드 가능
create policy "guestbook images upload"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'guestbook');

-- ════════════════════════════════════════════════════════════════
--  끝!  이제 사이트의 방명록이 동작합니다.
-- ════════════════════════════════════════════════════════════════
