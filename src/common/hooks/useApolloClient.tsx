import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { mutationList } from "common/graphql/mutations"

const isMutation = (value: string) => {
  if (mutationList.includes(value)) {
    return true
  }
  return false
}

const useApolloClient = () => {
  const authLink = setContext((request, { headers }) => {
    const mutation = isMutation(request.operationName || "")
    return {
      headers: {
        ...headers,
        "X-GraphQL-Method": mutation ? "Mutation" : "Query",
      },
    }
  })

  const link = authLink.concat(
    createHttpLink({
      uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
      credentials: "include",
    }),
  )

  const cache = new InMemoryCache()

  return new ApolloClient({
    cache,
    link,
  })
}

export { isMutation }
export default useApolloClient