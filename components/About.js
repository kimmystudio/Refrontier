import { about } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">작품 설명 / About</span>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <h2 className="about-heading">{about.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-body">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
