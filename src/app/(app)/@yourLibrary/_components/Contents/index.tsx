import { Suspense } from 'react'
import { PreloadQuery } from '@/lib/graphql/apollo-client'
import { GET_ALBUMS_ARTISTS } from '@/lib/queries/albums.query'
import Albums from './Albums'
import Artists from './Artists'
import ContentsSkeleton from './Contents.skeleton'

const Contents = async () => {
  return (
    <div className="flex-1 overflow-hidden overflow-y-scroll pb-10 text-gray-0 scrollbar-hide">
      <PreloadQuery
        query={GET_ALBUMS_ARTISTS}
        variables={{ offset: 0, limit: 20 }}
      >
        <Suspense fallback={<ContentsSkeleton />}>
          <Albums />
          <Artists />
        </Suspense>
      </PreloadQuery>
    </div>
  )
}

export default Contents
