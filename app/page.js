import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Links from "@/components/Links";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";

function Boundary() {
  return (
    <div className="boundary" aria-hidden="true">
      <span />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Boundary />
      <About />
      <Boundary />
      <Process />
      <Boundary />
      <Gallery />
      <Boundary />
      <Links />
      <Boundary />
      <Guestbook />
      <Footer />
    </main>
  );
}
