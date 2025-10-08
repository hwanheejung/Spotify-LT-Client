import { lazy, Suspense } from 'react'
import { PreloadQuery } from '@/lib/graphql/apollo-client'
import { GET_SEARCH_RESULTS } from '@/lib/queries/search.query'
import ResultSkeleton from './_components/Result.skelecon'

const ResultContainer = lazy(() => import('./_components/ResultContainer'))

interface SearchResultPageProps {
  params: Promise<{ query: string }>
}

const SearchResultPage = async ({ params }: SearchResultPageProps) => {
  const { query } = await params

  return (
    <div className="mb-20 h-full overflow-y-scroll px-5 pb-20 scrollbar-hide">
      <PreloadQuery query={GET_SEARCH_RESULTS} variables={{ query }}>
        <Suspense fallback={<ResultSkeleton />}>
          <ResultContainer query={query} />
        </Suspense>
      </PreloadQuery>
    </div>
  )
}

export default SearchResultPage
