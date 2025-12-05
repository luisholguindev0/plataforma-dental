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
      <Header />
      <main>
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
