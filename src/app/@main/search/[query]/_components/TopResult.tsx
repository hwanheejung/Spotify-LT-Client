import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { Section } from '@/components/section'
import type { Album } from './Albums'
import type { Artist } from './Artists'
import type { Track } from './Songs'

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
      {titleLink ? (
        <Link href={titleLink} className="hover:underline">
          {title}
        </Link>
      ) : (
        title
      )}
    </h3>
    <div className="text-gray-100">
      {type}
      {subTitle && subTitleLink && (
        <>
          •{' '}
          <Link href={subTitleLink} className="text-gray-0 hover:underline">
            {subTitle}
          </Link>
        </>
      )}
    </div>
  </div>
)

const getTopResultData = (
  type: 'track' | 'album' | 'artist',
  data: Track | Album | Artist,
) => {
  if (type === 'track') {
    const track = data as Track
    return {
      imageUrl: track.album?.images?.[0]?.url || '/placeholder.jpg',
      title: track.name,
      type: 'Song',
      subTitle: track.artists?.[0]?.name || 'Unknown Artist',
      subTitleLink: track.artists?.[0]?.id
        ? `/artist/${track.artists[0].id}`
        : undefined,
    }
  }

  if (type === 'artist') {
    const artist = data as Artist
    return {
      imageUrl: artist.images?.[0]?.url || '/placeholder.jpg',
      title: artist.name,
      titleLink: `/artist/${artist.id}`,
      type: 'Artist',
      isCircleImage: true,
    }
  }

  if (type === 'album') {
    const album = data as Album
    return {
      imageUrl: album.images?.[0]?.url || '/placeholder.jpg',
      title: album.name,
      type: album.album_type || 'Album',
      subTitle: album.artists?.[0]?.name || 'Unknown Artist',
      subTitleLink: album.artists?.[0]?.id
        ? `/artist/${album.artists[0].id}`
        : undefined,
    }
  }

  return null
}

const TopResult = ({ type, data }: TopResultProps) => {
  const topResultProps = useMemo(
    () => getTopResultData(type, data),
    [type, data],
  )
  if (!topResultProps) return null

  return (
    <Section title="Top result" hasLink={false}>
      <div className="h-full cursor-pointer rounded-md bg-gray-600 p-4 pb-7 transition-all duration-150 hover:bg-gray-400">
        <TopResultItem {...topResultProps} />
      </div>
    </Section>
  )
}

export default TopResult
