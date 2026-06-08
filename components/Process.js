import { videos } from "@/lib/content";
import Reveal from "./Reveal";

export default function Process() {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="section" id="process">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">작업 과정 / Process</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">영상으로 보는 작업 과정</h2>
        </Reveal>

        <div className="video-list">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={0.05 * i}>
              <article className="video-item">
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="video-caption">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{v.title}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
