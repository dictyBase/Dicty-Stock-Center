// @flow
import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Grid from "@material-ui/core/Grid"
import CatalogHeader from "components/Stocks/Catalogs/common/CatalogHeader"
import DetailsLoader from "components/Stocks/Details/common/DetailsLoader"
import CatalogErrorMessage from "components/Stocks/Catalogs/common/CatalogErrorMessage"
import StrainCatalogList from "./StrainCatalogList"
import StrainCatalogAppBar from "./StrainCatalogAppBar"
import { useStrainCatalogState } from "./StrainCatalogContext"
import useStyles from "components/Stocks/Catalogs/styles"

export const GET_STRAIN_LIST = gql`
  query StrainList($cursor: Int!) {
    listStrains(input: { cursor: $cursor, limit: 10 }) {
      nextCursor
      strains {
        id
        label
        summary
        in_stock
      }
    }
  }
`

/**
 * StrainCatalogContainer is the main component for the strain catalog page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const StrainCatalogContainer = () => {
  const {
    query,
    queryVariables,
    setQuery,
  }: {
    query: string,
    queryVariables: Object,
    setQuery: Function,
  } = useStrainCatalogState()
  const classes = useStyles()
  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: queryVariables,
  })

  let content

  if (loading) return <DetailsLoader />

  if (error) {
    content = <CatalogErrorMessage error={error} />
    setQuery(GET_STRAIN_LIST)
  } else {
    content = (
      <StrainCatalogList
        data={data.listStrains.strains}
        fetchMore={fetchMore}
        cursor={data.listStrains.nextCursor}
        filter={queryVariables.filter}
      />
    )
  }

  return (
    <Grid container className={classes.layout}>
      <Grid item xs={12}>
        <CatalogHeader title="Strain Catalog" />
      </Grid>
      <Grid item xs={12}>
        <StrainCatalogAppBar />
      </Grid>
      <Grid item xs={12}>
        {content}
      </Grid>
    </Grid>
  )
}

export default StrainCatalogContainer