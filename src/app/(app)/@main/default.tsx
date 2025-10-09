import { PreloadQuery } from '@/lib/graphql/apollo-client'
import { GET_NEW_RELEASES } from '@/lib/queries/albums.query'
import { auth } from '@/lib/utils/auth/auth'
import { Suspense } from 'react'
import NewReleases from './_components/NewReleases'
import NewReleasesSkeleton from './_components/NewReleases.skeleton'

const DefaultHome = async () => {
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) return null
  return (
    <div className="h-full overflow-y-scroll rounded-lg scrollbar-hide">
      <PreloadQuery query={GET_NEW_RELEASES} variables={{ limit: 5 }}>
        <Suspense fallback={<NewReleasesSkeleton />}>
          <NewReleases />
        </Suspense>
      </PreloadQuery>
    </div>
  )
}

export default DefaultHome
