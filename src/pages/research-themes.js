import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ResearchThemesLanding from '../components/home-v2/ResearchThemesLanding'

const ResearchThemesPage = () => (
  <Layout headerVariant="nav-only">
    <ResearchThemesLanding />
  </Layout>
)

export default ResearchThemesPage

export const Head = () => (
  <Seo
    title="Research Themes"
    description="Experimental CVC homepage prototype focused on Healthcare AI, World Models, AI for Science, Scientific Simulation, Computational Imaging, interpretable modeling, multimodal learning, and dynamic systems."
  />
)
