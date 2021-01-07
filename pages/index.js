import { QueryCache } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getContentByContentTypeId } from '../services/cms'
import Hero from '../components/Hero/Hero'
import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import TheCompanySection from '../components/TheCompanySection/TheCompanySection'
import NewsSection from '../components/NewsSection/NewsSection'
import ReferencesSection from '../components/ReferencesSection/ReferencesSection'
import SolutionsSection from '../components/SolutionsSection/SolutionsSection'
import MaterialSection from '../components/MaterialSection/MaterialSection'
import WorkWithUsSection from '../components/WorkWithUsSection/WorkWithUsSection'

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <Container noGutter>
        <TheCompanySection />
        <NewsSection />
        <ReferencesSection />
        <SolutionsSection />
        <MaterialSection />
        <WorkWithUsSection />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const queryCache = new QueryCache()
  const queries = [
    'heroItem',
    'theCompany',
    'news',
    'newsItem',
    'references',
    'solutions',
    'material',
    'workWithUs',
  ]

  const promises = queries.map(query =>
    queryCache.prefetchQuery(query, () => getContentByContentTypeId(query))
  )
  await Promise.all(promises)

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  }
}

export default HomePage
