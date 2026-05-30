"use client";
import dynamic from "next/dynamic";
import ParticleField from "@/components/ParticleField";
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

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
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
        <div className="glow-line" />
        <AboutSection />
        <div className="glow-line" />
        <JourneySection />
        <div className="glow-line" />
        <SkillsSection />
        <div className="glow-line" />
        <ExperienceSection />
        <div className="glow-line" />
        <ProjectsSection />
        <div className="glow-line" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
