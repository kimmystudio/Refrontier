import { site } from "@/lib/content";

export default function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="hero-grid" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div className="hero-top rise d1">
        <span>{site.exhibition.name}</span>
        <span>{site.exhibition.year}</span>
      </div>

      <div className="hero-main">
        <h1 className="hero-title">
          <span className="ko rise d1">{site.projectTitleKo}</span>
          <span className="en rise d2">{site.projectTitleEn}</span>
        </h1>
        <p className="hero-sub rise d3">
          {site.tagline}
          <span className="en">{site.taglineEn}</span>
        </p>
      </div>

      <div className="hero-bottom rise d4">
        <a className="hero-scroll" href="#about">
          <span className="dot" aria-hidden="true"></span>
          Scroll to explore
        </a>
        <span style={{ fontSize: 13, color: "var(--ink-soft)", letterSpacing: "0.04em" }}>
          {site.artist}
        </span>
      </div>
    </header>
  );
}
