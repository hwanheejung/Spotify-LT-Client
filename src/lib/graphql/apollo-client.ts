import { ApolloLink, fromPromise, HttpLink } from '@apollo/client'

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs'
import { cookies } from 'next/headers'

const cookieLink = new ApolloLink((operation, forward) => {
  return fromPromise(
    cookies().then((cookieStore) => {
      const sessionId = cookieStore.get('sessionId')?.value || ''
      operation.setContext({
        headers: {
          cookie: `sessionId=${sessionId}`,
        },
      })
      return forward(operation)
    }),
  )
})

const httpLink = new HttpLink({
  uri: `${process.env.API_HOST}/graphql`,
  credentials: 'include',
  fetchOptions: { cache: 'no-store' }, // 최신 권장사항: 캐싱 비활성화
})

const link = ApolloLink.from([cookieLink, httpLink])

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })
})
