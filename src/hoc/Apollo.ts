import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from '../utils/cookies'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', 
})

const authLink = setContext((_, { headers }) => {
  //   const token = getCookie(process.env.REACT_APP_COOKIE as string)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZkM2JhYjJhYmU1ZDI3NzRjOTkzMSIsImlhdCI6MTcyOTA5MDU4MywiZXhwIjoxNzMxNjgyNTgzfQ.Bv5jk3StmIYKInlLEplAI_iS7gcyG_uz8Ik26g24LWo" //colocar token aqui 
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})
// Crie uma instância do Apollo Client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})