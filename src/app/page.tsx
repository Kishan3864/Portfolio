"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SectionMarquee from "@/components/SectionMarquee";
import { projectCountLabel } from "@/lib/projects";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
// Lazy-load the background canvas so it never blocks first paint.
const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <SectionMarquee
          items={[
            "Ideas to shipped products",
            `${projectCountLabel} live deployments`,

            ".NET & Next.js",
            "Design · Build · Deploy",
          ]}
        />
        <AboutSection />
        <JourneySection />
        <SkillsSection />
        <ExperienceSection />
        <SectionMarquee
          reverse
          items={[
            "Selected work",
            "SaaS products",
            "Platforms & dashboards",
            "Client websites",
          ]}
        />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
