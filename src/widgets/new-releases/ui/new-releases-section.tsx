import { PreloadQuery } from '@/shared/graphql'
import { Suspense } from 'react'
import { GET_NEW_RELEASES } from '../model/queries'
import { NewReleases, NewReleasesSkeleton } from './new-releases'

const NewReleasesSection = () => {
  return (
    <PreloadQuery query={GET_NEW_RELEASES} variables={{ limit: 5 }}>
      <Suspense fallback={<NewReleasesSkeleton />}>
        <NewReleases />
      </Suspense>
    </PreloadQuery>
  )
}

export { NewReleasesSection }
