import { FaSpotify } from 'react-icons/fa'

const NoData = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex flex-col rounded-md bg-gray-400 px-5 py-4 pr-20">
      <FaSpotify size="1.3rem" className="mb-3" />
      <h2 className="text-2xl font-extrabold text-softPink">No Data</h2>
      <p className="text-nowrap">Sorry, No lyrics provided</p>
    </div>
  </div>
)

export default NoData
