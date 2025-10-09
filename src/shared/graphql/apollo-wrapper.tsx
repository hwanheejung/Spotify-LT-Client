'use client'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs'

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.API_HOST}/graphql`,
    credentials: 'include',
    fetchOptions: { cache: 'no-store' }, // 최신 권장사항: 캐싱 비활성화
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
