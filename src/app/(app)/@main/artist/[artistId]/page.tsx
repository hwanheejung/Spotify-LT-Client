import { ArtistDetails } from '@/widgets/artist-details'

const ArtistPage = async ({ params }: TProps) => {
  const { artistId } = await params

  return (
    <div className="scrollbar-hide">
      <ArtistDetails artistId={artistId} />
    </div>
  )
}

export default ArtistPage

type TProps = {
  params: Promise<{ artistId: string }>
}
