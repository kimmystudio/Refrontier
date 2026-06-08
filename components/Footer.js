import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-title">{site.projectTitleEn}</div>
        <div className="footer-meta">
          <div>{site.artist}</div>
          <div>{site.exhibition.name}</div>
          <div>{site.exhibition.year}</div>
          <div style={{ marginTop: 8 }}>
            <a href="#top" style={{ borderBottom: "1px solid var(--line-strong)" }}>
              맨 위로 ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
