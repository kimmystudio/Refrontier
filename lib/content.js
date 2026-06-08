// ══════════════════════════════════════════════════════════════
//  ✏️  이 파일만 수정하면 사이트 내용이 전부 바뀝니다.
//      (컴포넌트 코드는 건드릴 필요 없어요)
// ══════════════════════════════════════════════════════════════

export const site = {
  // ── 작가 / 전시 기본 정보 ────────────────────────────────
  artist: "김지원", // ← 본인 이름이 다르면 여기만 수정
  projectTitleKo: "리프론티어",
  projectTitleEn: "REFRONTIER",
  tagline: "조건 기반 도시 재통합 — 용산 미군기지 경계",
  taglineEn: "Condition-based Urban Reintegration · Yongsan Boundary",

  exhibition: {
    name: "홍익대학교 건축학과 졸업전시",
    venue: "전시 장소 / 일정을 여기에 적어주세요",
    year: "2027",
  },

  // ── 연결 / 비즈니스 ─────────────────────────────────────
  email: "kimmystudiokr@gmail.com",
  links: {
    instagram: "https://www.instagram.com/ms.moody_n_stuff/", // 인스타 주소
    youtube: "https://www.youtube.com/@jettydaily", // 유튜브 채널
  },
};

// ── 작품 설명 (About) ──────────────────────────────────────
// 문단별로 나눠서 적으면 됩니다.
export const about = {
  paragraphs: [
    "리프론티어는 용산 미군기지의 단절된 경계를 도시의 새로운 '전선(frontier)'으로 재해석하는 프로젝트입니다. 닫힌 담장을 무너뜨리는 것이 아니라, 도시의 조건에 따라 경계를 선택적으로 여는 방식을 제안합니다.",
    "100m 간격으로 설정된 개방 지점은 주변 도시 조직의 밀도, 보행 흐름, 녹지 연결성이라는 세 가지 조건에 반응합니다. 경계는 한 번에 사라지는 것이 아니라, 단계적 마스터플랜 안에서 도시와 함께 천천히 재구성됩니다.",
    "이 사이트는 그 과정 — 리서치, 다이어그램, 모형, 패널 — 을 기록하고, 전시를 찾아주신 분들과 그 기록을 나누기 위한 공간입니다.",
  ],
};

// ── 작업 과정 영상 (YouTube, 음소거 자동재생) ───────────────
// id 는 유튜브 주소 watch?v= 뒤의 값이에요.
//   예) https://www.youtube.com/watch?v=ABC123  →  id: "ABC123"
export const videos = [
  { id: "https://youtu.be/zlfPIUXeQmM?si=PQj9drOyi0C8cRDL", title: "작업 과정 기록 영상" }, // ← 본인 영상 ID로 교체
  // { id: "https://youtu.be/zlfPIUXeQmM?si=PQj9drOyi0C8cRDL", title: "모형 제작 과정" },
];

// ── 이미지 패널 (주제별 그룹 · 그룹 안에서 슬라이드) ─────────
// 이미지 파일은 public/gallery/ 폴더에 넣고 src 경로만 맞춰주세요.
// 같은 그룹(title)에 넣은 이미지들은 좌우 화살표로 넘겨볼 수 있어요.
export const galleryGroups = [
  {
    title: "리서치 · 분석",
    images: [
      { src: "/gallery/01.jpg", caption: "사이트 분석 — 용산 경계 다이어그램" },
      { src: "/gallery/02.jpg", caption: "100m 개방 지점 조건 매핑" },
    ],
  },
  {
    title: "다이어그램 · 계획",
    images: [
      { src: "/gallery/03.jpg", caption: "단계별 마스터플랜 스케치" },
    ],
  },
  {
    title: "모형",
    images: [
      { src: "/gallery/04.jpg", caption: "1:500 매스 스터디 모형" },
      { src: "/gallery/05.jpg", caption: "최종 모형 — 경계의 재구성" },
    ],
  },
  {
    title: "패널",
    images: [
      { src: "/gallery/06.jpg", caption: "패널 작업" },
    ],
  },
];
