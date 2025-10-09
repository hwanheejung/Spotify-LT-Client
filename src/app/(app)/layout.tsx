import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import { PremiumRequiredModal } from '@/features/play-track'
import { ApolloWrapper } from '@/shared/graphql'
import {
  LEFT_PANNEL_SIZE,
  MAIN_PANNEL_SIZE,
  ResizablePanel,
  ResizablePanelHandler,
  ResizablePanelLeft,
  ResizablePanelMain,
  ResizablePanelRight,
  RIGHT_PANNEL_SIZE,
} from '@/shared/ui/resizable-panel'
import { PlayingBar } from '@/widgets/playing-bar'
import { Header } from './_ui/header'

export const metadata: Metadata = {
  title: 'Spotify',
  description:
    'A Spotify lyrics translation and real-time synchronization tool',
}

interface AppLayoutProps {
  main: ReactNode
  yourLibrary: ReactNode
  sidebar: ReactNode
}

async function getDefaultLayout(): Promise<number[]> {
  try {
    const cookieStore = await cookies()
    const layout = cookieStore.get('react-resizable-panels:layout')
    if (layout?.value) {
      const parsed = JSON.parse(layout.value)
      if (Array.isArray(parsed) && parsed.length === 3) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Failed to get layout from cookies:', error)
  }

  return [
    LEFT_PANNEL_SIZE.DEFAULT,
    MAIN_PANNEL_SIZE.DEFAULT,
    RIGHT_PANNEL_SIZE.DEFAULT,
  ]
}

export default async function AppLayout({
  main,
  yourLibrary,
  sidebar,
}: Readonly<AppLayoutProps>) {
  const defaultLayout = await getDefaultLayout()

  return (
    <ApolloWrapper>
      <div className="flex flex-col h-dvh overflow-hidden">
        <Header />
        <div className="flex-1 px-3 overflow-hidden">
          <ResizablePanel>
            <ResizablePanelLeft
              defaultSize={defaultLayout[0] ?? LEFT_PANNEL_SIZE.DEFAULT}
            >
              {yourLibrary}
            </ResizablePanelLeft>
            <ResizablePanelHandler />
            <ResizablePanelMain
              defaultSize={defaultLayout[1] ?? MAIN_PANNEL_SIZE.DEFAULT}
            >
              {main}
            </ResizablePanelMain>
            <ResizablePanelHandler />
            <ResizablePanelRight
              defaultSize={defaultLayout[2] ?? RIGHT_PANNEL_SIZE.DEFAULT}
            >
              {sidebar}
            </ResizablePanelRight>
          </ResizablePanel>
        </div>
        <PlayingBar />
      </div>
      <PremiumRequiredModal />
    </ApolloWrapper>
  )
}
