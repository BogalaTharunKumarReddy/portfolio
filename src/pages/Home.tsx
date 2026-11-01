import { About } from '@/components/sections/About'
import { Blog } from '@/components/sections/Blog'
import { Certificates } from '@/components/sections/Certificates'
import { Contact } from '@/components/sections/Contact'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { GithubSection } from '@/components/sections/GithubSection'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { ResumeSection } from '@/components/sections/ResumeSection'
import { Skills } from '@/components/sections/Skills'
import { Workspace } from '@/components/sections/Workspace'
import { Seo } from '@/components/seo/Seo'
import { sectionIds } from '@/data/sections'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollSpy } from '@/hooks/useScrollSpy'

export default function Home() {
  const { setActive } = useActiveSection()
  useScrollSpy(sectionIds, setActive)

  return (
    <>
      <Seo path="/" />
      <Hero />
      <About />
      <Workspace />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <GithubSection />
      <ResumeSection />
      <Blog />
      <Contact />
    </>
  )
}
