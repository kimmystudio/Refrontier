import { gallery } from "@/lib/content";
import Reveal from "./Reveal";
import GalleryImage from "./GalleryImage";

export default function Gallery() {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">기록 / Documentation</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">이미지 아카이브</h2>
        </Reveal>

        <div className="gallery-grid">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={0.03 * (i % 3)} className="g-item">
              <figure style={{ margin: 0, display: "flex", flexDirection: "column" }}>
                <div className="g-media">
                  <GalleryImage src={g.src} alt={g.caption} />
                </div>
                <figcaption className="g-caption">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{g.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
