import { cookies } from 'next/headers'
import { auth } from '@/lib/utils/auth/auth'
import Contents from './_components/Contents'
import CreatePlaylist from './_components/CreatePlaylist'
import Header from './_components/Header'
import {
  type IFilterType,
  type IViewAs,
  MenuProvider,
} from './_components/MenuContext'

async function getDefault(): Promise<{ filter: IFilterType; viewAs: IViewAs }> {
  const cookieStore = await cookies()
  const filter = cookieStore.get('left-panel:filter')
  const viewAs = cookieStore.get('left-panel:view-as')

  return {
    filter: (filter?.value as IFilterType) || 'ALBUM',
    viewAs: (viewAs?.value as IViewAs) || 'LIST',
  }
}

const YourLibraryPage = async () => {
  const { isAuthenticated } = await auth()
  const { filter, viewAs } = await getDefault()

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-700">
      {isAuthenticated ? (
        <MenuProvider defaultFilter={filter} defaultViewAs={viewAs}>
          <Header />
          <Contents />
        </MenuProvider>
      ) : (
        <CreatePlaylist />
      )}
    </div>
  )
}

export default YourLibraryPage
