import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs'
import { cookies } from 'next/headers'

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('sessionId')?.value || ''

    const httpLink = new HttpLink({
      uri: `${process.env.API_HOST}/graphql`,
      credentials: 'include',
      fetchOptions: { cache: 'no-store' },
    })

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          cookie: `sessionId=${sessionId}`,
        },
      }))
      return forward(operation)
    })

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    })
  },
)
