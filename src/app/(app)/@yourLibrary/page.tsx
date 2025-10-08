import { cookies } from 'next/headers'
import Contents from './_components/Contents'
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
  const { filter, viewAs } = await getDefault()

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-700">
      <MenuProvider defaultFilter={filter} defaultViewAs={viewAs}>
        <Header />
        <Contents />
      </MenuProvider>
    </div>
  )
}

export default YourLibraryPage
