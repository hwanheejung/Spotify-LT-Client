import { NewReleasesSection } from '@/widgets/new-releases'

const DefaultHome = async () => {
  return (
    <div className="h-full overflow-y-scroll rounded-lg scrollbar-hide">
      <NewReleasesSection />
    </div>
  )
}

export default DefaultHome
