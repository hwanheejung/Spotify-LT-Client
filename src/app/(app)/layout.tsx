import { ApolloWrapper } from '@/shared/graphql'
import { PlayingBar } from '@/widgets/playing-bar'
import '@/shared/styles/globals.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import {
  LEFT_PANNEL_SIZE,
  MAIN_PANNEL_SIZE,
  ResizablePanel,
  RIGHT_PANNEL_SIZE,
} from '@/shared/ui'
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
  const cookieStore = await cookies()
  const layout = cookieStore.get('react-resizable-panels:layout')
  if (layout) return JSON.parse(layout.value)

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
      <Header />
      <div className="flex-1 overflow-hidden px-3">
        <ResizablePanel>
          <ResizablePanel.Left defaultSize={defaultLayout[0]}>
            {yourLibrary}
          </ResizablePanel.Left>
          <ResizablePanel.Handler />
          <ResizablePanel.Main defaultSize={defaultLayout[1]}>
            {main}
          </ResizablePanel.Main>
          <ResizablePanel.Handler />
          <ResizablePanel.Right defaultSize={defaultLayout[2]}>
            {sidebar}
          </ResizablePanel.Right>
        </ResizablePanel>
      </div>
      <PlayingBar />
    </ApolloWrapper>
  )
}
