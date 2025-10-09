import { lazy, Suspense } from 'react'
import { GET_ARTIST } from '@/entities/artist'
import { PreloadQuery } from '@/lib/graphql/apollo-client'

const ProfileHeader = lazy(() =>
  import('./_ui/ProfileHeader').then((module) => ({
    default: module.ProfileHeader,
  })),
)

const ArtistPage = async ({ params }: TProps) => {
  const { artistId } = await params

  return (
    <div className="scrollbar-hide">
      <PreloadQuery query={GET_ARTIST} variables={{ artistId }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileHeader artistId={artistId} />
        </Suspense>
      </PreloadQuery>
      <div className="h-[1000px]" />
    </div>
  )
}

export default ArtistPage

type TProps = {
  params: Promise<{ artistId: string }>
}
