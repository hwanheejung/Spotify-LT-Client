import { cookies } from 'next/headers'
import {
  MenuProvider,
  type TFilterType,
  type TViewAs,
  YourLibraryContents,
  YourLibraryHeader,
} from '@/widgets/your-library'

async function getDefault(): Promise<{ filter: TFilterType; viewAs: TViewAs }> {
  const cookieStore = await cookies()
  const filter = cookieStore.get('left-panel:filter')
  const viewAs = cookieStore.get('left-panel:view-as')

  return {
    filter: (filter?.value as TFilterType) || 'ALBUM',
    viewAs: (viewAs?.value as TViewAs) || 'LIST',
  }
}

const YourLibraryDefault = async () => {
  const { filter, viewAs } = await getDefault()

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-700">
      <MenuProvider defaultFilter={filter} defaultViewAs={viewAs}>
        <YourLibraryHeader />
        <YourLibraryContents />
      </MenuProvider>
    </div>
  )
}

export default YourLibraryDefault
