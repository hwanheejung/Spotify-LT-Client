import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/section'

export type Artist = {
  id: string
  name: string
  type: string
  images: {
    url: string
    height: number
    width: number
  }[]
}

const Artists = ({ artists }: { artists: Artist[] }) => {
  return (
    <Section title="Artists" hasLink href="/">
      <div className="grid grid-cols-4">
        {artists.map((artist) => (
          <div key={artist.id} className="rounded-md p-3 hover:bg-gray-600">
            <Image
              src={artist.images[0].url}
              alt={artist.name}
              width={100}
              height={100}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
              }}
              className="mb-4 rounded-full"
            />
            <Link
              href={`/artist/${artist.id}`}
              className="mt-2 text-sm font-semibold hover:underline"
            >
              {artist.name}
            </Link>
            <p className="text-xs text-gray-200">{artist.type}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Artists
