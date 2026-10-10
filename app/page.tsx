import GlassHero from "@/components/glass-hero";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ProcessSection from "@/components/process-section";
import ExperimentsSection from "@/components/experiments-section";
import ContactSection from "@/components/contact-section";

export default function Page() {
  return (
    <>
      <GlassHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ProcessSection />
      <ExperimentsSection />
      <ContactSection />
    </>
  );
}
