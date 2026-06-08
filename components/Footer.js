import { site } from "@/lib/content";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap footer-grid">
        <div className="footer-left">
          <div className="footer-title">{site.projectTitleEn}</div>
          <a className="footer-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="social"
            >
              <YoutubeIcon />
            </a>
          </div>
          <div className="footer-meta">
            <span>{site.artist}</span>
            <span>{site.exhibition.name}</span>
            <span>{site.exhibition.year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
