import { site } from "@/lib/content";
import Reveal from "./Reveal";

function handleFromUrl(url) {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || u.hostname;
  } catch {
    return url;
  }
}

export default function Links() {
  const { instagram, youtube } = site.links;

  return (
    <section className="section" id="links">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">연결 / Elsewhere</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">더 많은 기록 보기</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="links-row">
            <a className="link-card" href={instagram} target="_blank" rel="noopener noreferrer">
              <span>
                <span className="link-label">Instagram</span>
                <span className="link-handle">{handleFromUrl(instagram)}</span>
              </span>
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="link-card" href={youtube} target="_blank" rel="noopener noreferrer">
              <span>
                <span className="link-label">YouTube</span>
                <span className="link-handle">{handleFromUrl(youtube)}</span>
              </span>
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
