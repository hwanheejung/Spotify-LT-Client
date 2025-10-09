import { lazy, Suspense } from 'react'
import { GET_SEARCH_RESULTS, SearchResultsSkeleton } from '@/features/search'
import { PreloadQuery } from '@/lib/graphql/apollo-client'

const SearchResults = lazy(() =>
  import('@/features/search/ui/search-results').then((module) => ({
    default: module.SearchResults,
  })),
)

const SearchResultPage = async ({ params }: TProps) => {
  const { query } = await params

  return (
    <div className="mb-20 h-full overflow-y-scroll px-5 pb-20 scrollbar-hide">
      <PreloadQuery query={GET_SEARCH_RESULTS} variables={{ query }}>
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </PreloadQuery>
    </div>
  )
}

export default SearchResultPage

type TProps = {
  params: Promise<{ query: string }>
}
