import * as React from 'react'
import { useSiteMetadata } from '../../context/SiteContext'
import AboutCondensed from '../AboutCondensed'
import PeopleCondensed from '../PeopleCondensed'
import HeroSection from './HeroSection'
import ThemeSelector from './ThemeSelector'
import ThemeExplainerPanel from './ThemeExplainerPanel'
import FeaturedProjectsGrid from './FeaturedProjectsGrid'
import OutputsSection from './OutputsSection'
import MetricsSection from './MetricsSection'
import '../../components/home-v2/research-themes.css'
import publicationData from '../../data/papers.json'

const {
  defaultHomepageThemeId,
  homepageThemes,
  homepageThemeById,
} = require('../../data/site/homepageThemes')

const ResearchThemesLanding = () => {
  const { projectTiles, softwareProjects, newsTiles, peopleCards } = useSiteMetadata()
  const [activeThemeId, setActiveThemeId] = React.useState(defaultHomepageThemeId)
  const activeTheme = homepageThemeById[activeThemeId] || homepageThemes[0]

  const activeThemeProjects = React.useMemo(() => {
    const projectsByName = new Map((projectTiles || []).map(project => [project.name, project]))

    return activeTheme.projectNames.map(name => projectsByName.get(name)).filter(Boolean)
  }, [activeTheme, projectTiles])

  const outputStats = React.useMemo(() => {
    const softwareToolCount = (softwareProjects || []).reduce(
      (total, category) => total + (category.items?.length || 0),
      0
    )
    const currentMemberCount = (peopleCards || []).filter(
      person => person.status === 'current' || person.status === true || person.Current === true
    ).length

    return {
      projectCount: (projectTiles || []).length,
      publicationCount: publicationData.length,
      softwareCategoryCount: (softwareProjects || []).length,
      softwareToolCount,
      newsCount: (newsTiles || []).length,
      currentMemberCount,
      yearsOfResearch: '30+',
    }
  }, [newsTiles, peopleCards, projectTiles, softwareProjects])

  return (
    <>
      <HeroSection />
      <ThemeSelector
        themes={homepageThemes}
        activeThemeId={activeTheme.id}
        onSelectTheme={setActiveThemeId}
      />
      <ThemeExplainerPanel theme={activeTheme} />
      <FeaturedProjectsGrid theme={activeTheme} projects={activeThemeProjects} />
      <OutputsSection
        publicationCount={outputStats.publicationCount}
        softwareCategoryCount={outputStats.softwareCategoryCount}
        softwareToolCount={outputStats.softwareToolCount}
        newsCount={outputStats.newsCount}
      />
      <MetricsSection
        projectCount={outputStats.projectCount}
        publicationCount={outputStats.publicationCount}
        currentMemberCount={outputStats.currentMemberCount}
        yearsOfResearch={outputStats.yearsOfResearch}
      />
      <AboutCondensed />
      <PeopleCondensed peopleCards={peopleCards || []} />
    </>
  )
}

export default ResearchThemesLanding
