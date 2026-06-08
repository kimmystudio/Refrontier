import "./globals.css";
import { site } from "@/lib/content";

export const metadata = {
  title: `${site.projectTitleKo} · ${site.projectTitleEn} — ${site.artist}`,
  description: site.tagline,
  openGraph: {
    title: `${site.projectTitleKo} · ${site.projectTitleEn}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard (본문/UI) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* Fraunces (라틴 디스플레이) + Gowun Batang (한글 세리프) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Gowun+Batang:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
