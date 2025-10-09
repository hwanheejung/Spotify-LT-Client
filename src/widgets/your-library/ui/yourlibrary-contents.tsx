import { Suspense } from 'react'
import { GET_ALBUMS_ARTISTS } from '@/lib/queries/albums.query'
import { PreloadQuery } from '@/shared/graphql/apollo-client'
import { SkeletonCircle, SkeletonText } from '@/shared/ui/skeleton'
import { SavedAlbums } from './saved-albums'
import { SavedArtists } from './saved-artists'

const YourLibraryContents = async () => {
  return (
    <div className="flex-1 overflow-hidden overflow-y-scroll pb-10 text-gray-0 scrollbar-hide">
      <PreloadQuery
        query={GET_ALBUMS_ARTISTS}
        variables={{ offset: 0, limit: 20 }}
      >
        <Suspense fallback={<ContentsSkeleton />}>
          <SavedAlbums />
          <SavedArtists />
        </Suspense>
      </PreloadQuery>
    </div>
  )
}

export { YourLibraryContents }

const ContentsSkeleton = () => {
  return (
    <div className="flex flex-col overflow-y-scroll scrollbar-hide">
      {Array.from({ length: 3 }).map(() => (
        <div
          className="flex items-center gap-4 px-3 py-3"
          key={crypto.randomUUID()}
        >
          <SkeletonCircle size="56px" />
          <div className="flex-1 pr-5">
            <SkeletonText lines={2} />
          </div>
        </div>
      ))}
    </div>
  )
}
