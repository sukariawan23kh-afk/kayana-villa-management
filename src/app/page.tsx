import { LanguageProvider } from "@/components/site/LanguageProvider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Revenue } from "@/components/site/Revenue";
import { OwnerSection } from "@/components/site/OwnerSection";
import { Packages } from "@/components/site/Packages";
import { Portfolio } from "@/components/site/Portfolio";
import { GuestExperience } from "@/components/site/GuestExperience";
import { WhyKayana } from "@/components/site/WhyKayana";
import { Testimonials } from "@/components/site/Testimonials";
import { Insights } from "@/components/site/Insights";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <TrustStrip />
          <About />
          <Services />
          <Process />
          <Revenue />
          <OwnerSection />
          <Packages />
          <Portfolio />
          <GuestExperience />
          <WhyKayana />
          <Testimonials />
          <Insights />
          <FAQ />
          <Contact />
          <FinalCTA />
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatbotWidget />
      </div>
    </LanguageProvider>
  );
}
