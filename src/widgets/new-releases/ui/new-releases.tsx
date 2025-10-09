'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import { GetNewReleasesQuery } from '@/shared/graphql'
import { GridList, Skeleton, SkeletonText } from '@/shared/ui'
import { GET_NEW_RELEASES } from '../model/queries'
import { Section } from './section'

const NewReleases = () => {
  const { data } = useSuspenseQuery<GetNewReleasesQuery>(GET_NEW_RELEASES)

  const validReleases = (data.newReleases ?? []).filter(
    (release): release is TNewRelease => release !== null,
  )

  return (
    <Section title="New Releases" hasLink={false}>
      <GridList
        data={validReleases}
        itemMinWidth={150}
        keyExtractor={(item) => item.id}
        renderItem={RenderItem}
        maxNum={5}
      />
    </Section>
  )
}

export { NewReleases, NewReleasesSkeleton }

const RenderItem = (release: TNewRelease) => {
  return match(release)
    .with(
      {
        id: P.string,
        name: P.string,
        images: P.when(
          (imgs) => Array.isArray(imgs) && imgs.length > 0 && imgs[0]?.url,
        ),
        artists: P.when(
          (arts) => Array.isArray(arts) && arts.length > 0 && arts[0]?.name,
        ),
      },
      (release) => {
        const imageUrl = release.images![0]!.url!
        const artistName = release.artists![0]!.name!

        return (
          <Link
            href={`/album/${release.id}`}
            className="flex flex-col rounded-sm p-2 hover:bg-gray-500"
          >
            <Image
              src={imageUrl}
              alt={release.name}
              width={200}
              height={200}
              className="aspect-square h-auto w-auto rounded-sm object-cover"
            />
            <p className="pt-2 font-semibold text-gray-0">{release.name}</p>
            <p className="text-xs text-gray-100">{artistName}</p>
          </Link>
        )
      },
    )
    .otherwise(() => null)
}

const NewReleasesSkeleton = () => (
  <Section title="New Releases" hasLink={false}>
    <GridList
      data={Array.from({ length: 5 }).fill(0)}
      itemMinWidth={150}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => (
        <div className="flex flex-col p-2">
          <Skeleton className="mb-2 aspect-square w-full rounded-sm" />
          <SkeletonText lines={2} />
        </div>
      )}
    />
  </Section>
)

type TNewRelease = NonNullable<
  NonNullable<GetNewReleasesQuery['newReleases']>[number]
>
