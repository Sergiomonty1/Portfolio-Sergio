'use client'

import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  ContactSection,
} from '@/app/components/sections'
import { CustomCursor } from '@/app/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
