import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { match, P } from 'ts-pattern'
import type { GetSearchResultsQuery } from '@/shared/graphql'
import { Section } from './section'

type SearchData = NonNullable<GetSearchResultsQuery['search']>
type Track = NonNullable<NonNullable<SearchData['tracks']>[number]>
type Album = NonNullable<NonNullable<SearchData['albums']>[number]>
type Artist = NonNullable<NonNullable<SearchData['artists']>[number]>

export type TopResultProps = {
  type: 'track' | 'album' | 'artist'
  data: Track | Album | Artist
}

interface TopResultItemProps {
  imageUrl: string
  title: string
  titleLink?: string
  type: string
  subTitle?: string
  subTitleLink?: string
  isCircleImage?: boolean
}

const TopResultItem = ({
  imageUrl,
  title,
  titleLink,
  type,
  subTitle,
  subTitleLink,
  isCircleImage = false,
}: TopResultItemProps) => (
  <div className="overflow-hidden">
    <Image
      src={imageUrl}
      alt={title}
      width={120}
      height={120}
      className={isCircleImage ? 'rounded-full' : 'rounded-md'}
    />
    <h3 className="block overflow-hidden text-ellipsis text-nowrap pt-4 text-2xl font-extrabold">
      {match(titleLink)
        .with(P.string, (link) => (
          <Link href={link} className="hover:underline">
            {title}
          </Link>
        ))
        .otherwise(() => title)}
    </h3>
    <div className="text-gray-100">
      {type}
      {match({ subTitle, subTitleLink })
        .with(
          { subTitle: P.string, subTitleLink: P.string },
          ({ subTitle, subTitleLink }) => (
            <>
              •{' '}
              <Link href={subTitleLink} className="text-gray-0 hover:underline">
                {subTitle}
              </Link>
            </>
          ),
        )
        .otherwise(() => null)}
    </div>
  </div>
)

const getTopResultData = (
  type: 'track' | 'album' | 'artist',
  data: Track | Album | Artist,
): TopResultItemProps | null => {
  return match({ type, data })
    .with(
      {
        type: 'track',
        data: {
          name: P.string,
          album: {
            images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
          },
          artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
        },
      },
      ({ data }) => {
        const track = data as Track
        return {
          imageUrl: track.album!.images![0]!.url!,
          title: track.name!,
          type: 'Song',
          subTitle: track.artists![0]!.name || 'Unknown Artist',
          subTitleLink: track.artists![0]!.id
            ? `/artist/${track.artists![0]!.id}`
            : undefined,
        }
      },
    )
    .with(
      {
        type: 'artist',
        data: {
          id: P.string,
          name: P.string,
          images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
        },
      },
      ({ data }) => {
        const artist = data as Artist
        return {
          imageUrl: artist.images![0]!.url!,
          title: artist.name!,
          titleLink: `/artist/${artist.id}`,
          type: 'Artist',
          isCircleImage: true,
        }
      },
    )
    .with(
      {
        type: 'album',
        data: {
          name: P.string,
          images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
          artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
        },
      },
      ({ data }) => {
        const album = data as Album
        return {
          imageUrl: album.images![0]!.url!,
          title: album.name!,
          type: album.album_type || 'Album',
          subTitle: album.artists![0]!.name || 'Unknown Artist',
          subTitleLink: album.artists![0]!.id
            ? `/artist/${album.artists![0]!.id}`
            : undefined,
        }
      },
    )
    .otherwise(() => null)
}

const TopResult = ({ type, data }: TopResultProps) => {
  const topResultProps = useMemo(
    () => getTopResultData(type, data),
    [type, data],
  )

  return match(topResultProps)
    .with(P.not(P.nullish), (props) => (
      <Section title="Top result" hasLink={false}>
        <div className="h-full cursor-pointer rounded-md bg-gray-600 p-4 pb-7 transition-all duration-150 hover:bg-gray-400">
          <TopResultItem {...props} />
        </div>
      </Section>
    ))
    .otherwise(() => null)
}

export { TopResult }
