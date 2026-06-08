import Header from "@/components/Header";
import Section from "@/components/Section";
import VideoCarousel from "@/components/VideoCarousel";
import GalleryGroups from "@/components/GalleryGroups";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import { about, videos, galleryGroups } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Header />

      <div className="acc-list wrap">
        <Section title="작품 설명" subtitle="About" defaultOpen>
          <div className="about-body">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section title="작업 과정 영상" subtitle="Process">
          <VideoCarousel videos={videos} />
        </Section>

        <Section title="이미지 패널" subtitle="Panels">
          <GalleryGroups groups={galleryGroups} />
        </Section>
      </div>

      <Guestbook />

      <Footer />
    </main>
  );
}
