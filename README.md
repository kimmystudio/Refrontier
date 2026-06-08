# 리프론티어 · REFRONTIER — 졸업전시 웹사이트

용산 미군기지 경계 도시 재통합 프로젝트 전시 사이트입니다.
작업 과정 영상 · 이미지 갤러리 · 인스타/유튜브 링크 · **방명록(사진 업로드 + 문구)** 기능이 있습니다.

기술 구성: **Next.js + Supabase(방명록 저장) + Vercel(배포)**

---

## 🚀 처음부터 끝까지 (대략 30분)

### 0. 준비물

- GitHub 계정
- Supabase 계정 (무료)
- Vercel 계정 (무료, GitHub로 로그인 추천)
- 컴퓨터에 Node.js 설치 (선택 — 로컬에서 미리 보고 싶을 때만)

---

### 1. 내 컴퓨터에서 먼저 확인 (선택)

> 바로 배포해도 되지만, 미리 보고 싶다면:

```bash
npm install      # 처음 한 번만
npm run dev      # http://localhost:3000 에서 확인
```

이 단계에서 방명록은 아직 동작하지 않아요(아래 Supabase 설정 후 동작).

---

### 2. Supabase 만들기 (방명록 저장소)

1. https://supabase.com → **New project** 생성 (Region은 `Northeast Asia (Seoul)` 추천)
2. 프로젝트가 켜지면 왼쪽 메뉴 **SQL Editor** → **New query**
3. 이 폴더의 **`supabase-setup.sql`** 내용을 전부 복사해 붙여넣고 **RUN**
   → 방명록 테이블 + 이미지 버킷 + 보안 정책이 한 번에 생성됩니다.
4. 왼쪽 메뉴 **Project Settings → API** 에서 두 값을 복사해 둡니다:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public** 키 (공개되어도 안전한 키예요)

---

### 3. 내 정보로 내용 바꾸기

**`lib/content.js`** 파일 하나만 열어서 수정하면 됩니다:

- `artist` — 본인 이름
- `links.instagram` / `links.youtube` — 내 계정 주소
- `videos` — 유튜브 영상 ID (주소 `watch?v=` 뒤의 값)
- `gallery` — 이미지 캡션 (이미지 파일은 `public/gallery/` 폴더에 넣기)
- `about` — 작품 설명 글

> 갤러리 이미지: `public/gallery/` 안에 `01.jpg`, `02.jpg` … 식으로 넣으면 됩니다.
> 이미지가 없으면 "이미지 추가 예정" 자리 표시가 보여요.

---

### 4. GitHub에 올리기

```bash
git init
git add .
git commit -m "refrontier exhibition site"
```

그다음 GitHub에서 새 저장소(repository)를 만들고, 화면에 나오는
`git remote add ...` / `git push ...` 명령을 그대로 실행하면 됩니다.

> ⚠️ `.env.local` 은 `.gitignore` 에 들어 있어 **GitHub에 올라가지 않습니다.**
> (키는 다음 단계에서 Vercel에 직접 넣어요.)

---

### 5. Vercel로 배포 + 환경변수 넣기

1. https://vercel.com → **Add New → Project** → 방금 만든 GitHub 저장소 선택
2. 배포 설정 화면에서 **Environment Variables** 에 아래 두 개를 추가:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (2단계에서 복사한 Project URL) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (2단계에서 복사한 anon public 키) |

3. **Deploy** 클릭 → 몇 분 뒤 `https://....vercel.app` 주소가 생깁니다. 끝! 🎉

> 나중에 내용을 바꾸면 GitHub에 `git push` 만 하면 Vercel이 자동으로 다시 배포해요.

---

## 🧹 방명록 관리

- 들어온 글/사진은 Supabase 대시보드 **Table Editor → guestbook** 에서 볼 수 있어요.
- 부적절한 글은 그 화면에서 행을 선택해 **삭제**하면 사이트에서도 사라집니다.
- 사진 파일은 **Storage → guestbook** 버킷에서 관리합니다.

### 전시 끝난 뒤 방명록을 잠그고 싶다면

새 글이 안 들어오게 막으려면 Supabase SQL Editor에서:

```sql
drop policy "guestbook insert for all" on public.guestbook;
```

다시 열려면 `supabase-setup.sql` 의 insert 정책 부분을 다시 RUN 하면 됩니다.

---

## 📁 폴더 구조

```
lib/content.js          ← ✏️ 내용은 여기서 다 바꿈
app/page.js             ← 섹션 순서
app/globals.css         ← 디자인/색상/폰트
components/             ← 각 섹션 (Hero, About, Gallery, Guestbook …)
public/gallery/         ← 갤러리 이미지 넣는 곳
supabase-setup.sql      ← Supabase에 한 번 실행하는 설정
```

## 색상/폰트 바꾸기

`app/globals.css` 맨 위 `:root` 의 `--accent`(포인트 색), `--bg`(배경) 등을
바꾸면 전체 톤이 바뀝니다.
