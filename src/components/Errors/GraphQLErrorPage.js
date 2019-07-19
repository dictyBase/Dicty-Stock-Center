// @flow
import React from "react"
import GraphQLNetworkError from "./GraphQLNetworkError"
import ServerError from "./ServerError"
import NotFoundError from "./NotFoundError"
import OtherError from "./OtherError"

type Props = {
  /** GraphQL error object */
  error: Object,
  /** Material-UI styling */
  classes: Object,
}

/**
 * GraphQLErrorPage is used to display any errors found when issuing a
 * GraphQL query or mutation.
 */

const GraphQLErrorPage = ({ error, classes }: Props) => {
  if (!error || !error.message) return null

  if (error.networkError) {
    console.error(error.networkError)
    return <GraphQLNetworkError />
  }

  const errorCode = error.graphQLErrors[0].extensions.code
  const errorMsg = error.graphQLErrors[0].message
  const printError = `
  error: ${errorMsg}
  code: ${errorCode}
  `

  if (errorCode === "Unavailable") {
    console.error(printError)
    return <ServerError />
  }

  if (errorCode === "NotFound") {
    console.error(printError)
    return (
      <NotFoundError
        error={errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
      />
    )
  }

  console.error(printError)
  return <OtherError />
}

GraphQLErrorPage.defaultProps = {
  error: {},
}

export default GraphQLErrorPage
