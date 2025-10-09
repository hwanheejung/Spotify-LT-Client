import { Suspense } from 'react'
import { PreloadQuery } from '@/shared/graphql/apollo-client'
import { GET_ARTIST } from '../model/queries'
import { ProfileHeader, ProfileHeaderSkeleton } from './profile-header'

const ArtistDetails = ({ artistId }: TProps) => {
  return (
    <>
      <PreloadQuery query={GET_ARTIST} variables={{ artistId }}>
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader artistId={artistId} />
        </Suspense>
      </PreloadQuery>
      <div className="h-[1000px]" />
    </>
  )
}

export { ArtistDetails }

type TProps = {
  artistId: string
}
