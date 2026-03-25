'use client'

import { useEffect } from 'react'
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  ContactSection,
} from '@/app/components/sections'
import { CustomCursor } from '@/app/components/CustomCursor'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
