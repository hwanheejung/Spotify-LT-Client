import { NewReleasesSection } from '@/widgets/new-releases'

const Home = async () => {
  return (
    <div className="h-full overflow-y-scroll rounded-lg scrollbar-hide">
      <NewReleasesSection />
    </div>
  )
}

export default Home
