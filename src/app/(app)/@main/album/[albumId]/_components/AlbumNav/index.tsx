import PlayButton from './PlayButton'

interface AlbumNavProps {
  id: string
}

const AlbumNav = ({ id }: AlbumNavProps) => {
  return (
    <div className="px-5 pb-5">
      <PlayButton albumId={id} />
    </div>
  )
}
export default AlbumNav
