'use client'

import { GridList } from '@/components/flatlist'
import { Section } from '@/components/section'
import { GET_NEW_RELEASES } from '@/lib/queries/albums.query'
import { NewReleasesDTO } from '@/types/albums.types'
import { useSuspenseQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

const RenderItem = ({ id, images, name, artists }: NewReleasesDTO) => (
  <Link
    href={`/album/${id}`}
    className="flex flex-col rounded-sm p-2 hover:bg-gray-500"
  >
    <Image
      src={images[0].url}
      alt={name}
      width={200}
      height={200}
      className="aspect-square h-auto w-auto rounded-sm object-cover"
    />
    <p className="pt-2 font-semibold text-gray-0">{name}</p>
    <p className="text-xs text-gray-100">{artists[0].name}</p>
  </Link>
)

const NewReleases = () => {
  const { data } = useSuspenseQuery<{ newReleases: NewReleasesDTO[] }>(
    GET_NEW_RELEASES,
    {
      variables: {
        limit: 5,
      },
    },
  )

  return (
    <Section title="New Releases" hasLink={false}>
      <GridList
        data={data.newReleases}
        itemMinWidth={150}
        keyExtractor={(item) => item.id}
        renderItem={RenderItem}
        maxNum={5}
      />
    </Section>
  )
}

export default NewReleases
