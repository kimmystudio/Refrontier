import { site } from "@/lib/content";
import { about } from "@/lib/content";

export default function Header() {
  return (
    <header className="head wrap" id="top">
      <div className="head-top">
        <span className="head-exh">{site.exhibition.name}</span>
        <span className="head-year">{site.exhibition.year}</span>
      </div>

      <div className="head-main">
        <h1 className="head-title">
          {site.projectTitleKo}
          <span className="head-title-en">{site.projectTitleEn}</span>
        </h1>
        <p className="head-tagline">{site.tagline}</p>
        <p className="head-artist">{site.artist}</p>
      </div>
    </header>
  );
}
