import { AlbumDetails } from '@/widgets/album-details'
import AlbumNav from './_components/AlbumNav'

const AlbumPage = async ({ params }: TProps) => {
  const { albumId } = await params

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide">
      <AlbumNav id={albumId} />
      <AlbumDetails albumId={albumId} />
    </div>
  )
}

export default AlbumPage

type TProps = {
  params: Promise<{ albumId: string }>
}
