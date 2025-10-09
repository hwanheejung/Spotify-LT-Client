'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { Suspense } from 'react'
import { match, P } from 'ts-pattern'
import { GET_ARTIST } from '@/lib/queries/artists.query'
import type { GetArtistQuery } from '@/shared/__graphql-generated__/dto'

const ProfileHeaderLoading = () => (
  <div className="flex h-80 items-center justify-center">
    <div className="text-gray-200">Loading artist...</div>
  </div>
)

const NoArtist = () => (
  <div className="flex h-80 items-center justify-center">
    <div className="text-gray-200">Artist not found</div>
  </div>
)

const ProfileHeaderContent = ({ artistId }: { artistId: string }) => {
  const { data } = useSuspenseQuery<GetArtistQuery>(GET_ARTIST, {
    variables: { artistId },
  })

  return match(data.artist)
    .with(
      {
        name: P.string,
        images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
        followers: { total: P.number },
      },
      (artist) => (
        <div
          className="relative flex h-80 w-full flex-col justify-end bg-cover bg-center p-5"
          style={{
            backgroundImage: `url(${artist.images![0]!.url})`,
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-gray-900/90" />
          <div className="z-10 text-5xl font-extrabold">{artist.name}</div>
          <div className="z-10">{artist.followers!.total} followers</div>
        </div>
      ),
    )
    .otherwise(() => <NoArtist />)
}

const ProfileHeader = ({ artistId }: { artistId: string }) => {
  return (
    <Suspense fallback={<ProfileHeaderLoading />}>
      <ProfileHeaderContent artistId={artistId} />
    </Suspense>
  )
}

export default ProfileHeader
