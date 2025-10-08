import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/section'
import { parseDate } from '@/lib/utils/parse-date'

export type Album = {
  id: string
  name: string
  album_type: string
  release_date: string
  images: {
    url: string
    height: number
    width: number
  }[]
  artists: {
    id: string
    name: string
  }[]
}

const Albums = ({ albums }: { albums: Album[] }) => {
  return (
    <Section title="Albums" hasLink href="/">
      <div className="grid grid-cols-4">
        {albums.map((album) => (
          <div key={album.id} className="rounded-md p-3 hover:bg-gray-600">
            <Image
              src={album.images[0].url}
              alt={album.name}
              width={100}
              height={100}
              className="mb-4 aspect-square rounded-lg object-cover"
              style={{
                width: '100%',
              }}
            />
            <Link
              href={`/album/${album.id}`}
              className="mt-2 text-sm font-semibold hover:underline"
            >
              {album.name}
            </Link>
            <p className="text-xs text-gray-200">
              {parseDate(album.release_date).year} • {album.artists[0].name}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Albums
