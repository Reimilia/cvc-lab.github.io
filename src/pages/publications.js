import * as React from 'react'

import Layout from '../components/layout'
import PublicationTable from '../components/publication_table'
import publicationData from '../data/papers.json'

const PublicationsPage = () => {
  return (
    <Layout>
      <PublicationTable id="publications" publicationData={publicationData}></PublicationTable>
    </Layout>
  )
}

export default PublicationsPage
