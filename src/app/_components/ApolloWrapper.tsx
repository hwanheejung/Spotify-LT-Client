'use client'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.API_HOST}/graphql`,
    credentials: 'include',
    fetchOptions: { cache: 'no-store' },
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

const client = makeClient()

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
