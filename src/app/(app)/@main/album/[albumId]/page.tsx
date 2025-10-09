import { PlayAlbumTracksButton } from '@/features/play-track'
import { AlbumDetails } from '@/widgets/album-details'

const AlbumPage = async ({ params }: TProps) => {
  const { albumId } = await params

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide">
      <div className="px-5 pb-5">
        <PlayAlbumTracksButton albumId={albumId} />
      </div>
      <AlbumDetails albumId={albumId} />
    </div>
  )
}

export default AlbumPage

type TProps = {
  params: Promise<{ albumId: string }>
}
