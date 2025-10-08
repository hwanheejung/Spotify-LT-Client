import { FaSpotify } from 'react-icons/fa'

const dummyLyrics =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \nAenean commodo ligula eget dolor. \nAenean massa. \nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. \nNulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. \nIn enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. \nNullam dictum felis eu pede mollis pretium. \nInteger tincidunt. Cras dapibus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \nAenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \nAenean commodo ligula eget dolor. \nAenean massa. \nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. \nNulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. \nIn enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. \nNullam dictum felis eu pede mollis pretium. \nInteger tincidunt. Cras dapibus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \nAenean commodo ligula eget dolor.'

const Locked = () => {
  return (
    <div className="relative h-full overflow-hidden p-5">
      <p className="whitespace-pre-line text-lg font-bold text-gray-100 blur-sm filter">
        {dummyLyrics}
      </p>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-gray-400 px-5 py-4">
        <FaSpotify size="1.3rem" className="mb-3" />
        <h2 className="text-2xl font-extrabold text-softBlue">Lyrics Access</h2>
        <p className="text-nowrap">Solve the quiz to unlock the full lyrics!</p>
      </div>
    </div>
  )
}

export default Locked
