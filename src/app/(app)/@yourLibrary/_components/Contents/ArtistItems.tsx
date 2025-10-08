import Image from 'next/image'
import Link from 'next/link'
import type { ArtistDTO } from '@/types/artists.types'

export const ArtistCollapsedView = ({ artist }: { artist: ArtistDTO }) => (
  <Link
    href={`/artist/${artist.id}`}
    className="flex items-center justify-center p-3 hover:bg-gray-500"
  >
    <Image
      src={artist.images[0].url}
      alt="Album Cover"
      width={56}
      height={56}
      className="aspect-square rounded-sm object-cover"
      style={{
        width: '100%',
      }}
    />
  </Link>
)

export const ArtistListView = ({ artist }: { artist: ArtistDTO }) => (
  <Link
    href={`/artist/${artist.id}`}
    className="flex items-center gap-4 px-3 py-3 hover:bg-gray-500"
  >
    <Image
      src={artist.images[0].url}
      alt={artist.name}
      className="aspect-square rounded-full object-cover"
      width={56}
      height={56}
    />
    <p>{artist.name}</p>
  </Link>
)

export const ArtistCompactView = ({ artist }: { artist: ArtistDTO }) => (
  <Link
    href={`/artist/${artist.id}`}
    className="flex px-3 py-1 hover:bg-gray-500"
  >
    {artist.name}
  </Link>
)

export const ArtistGridView = ({ artist }: { artist: ArtistDTO }) => (
  <Link
    href={`/artist/${artist.id}`}
    className="flex flex-col p-5 hover:bg-gray-500"
  >
    <Image
      src={artist.images[0].url}
      alt={artist.name}
      className="aspect-square w-full rounded-full object-cover"
      width={200}
      height={200}
    />
    <p>{artist.name}</p>
  </Link>
)
