import {
  Header,
  Hero,
  Services,
  About,
  Testimonials,
  Location,
  Footer,
  WhatsAppButton,
} from "@/components/landing";

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
