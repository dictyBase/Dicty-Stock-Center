// @flow
import React from "react"
import gql from "graphql-tag"
import { FixedSizeList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import InfiniteLoader from "react-window-infinite-loader"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Checkbox from "@material-ui/core/Checkbox"
import StrainCatalogListItem from "components/Stocks/Strains/Catalog/StrainCatalogListItem"

const GET_MORE_STRAINS_LIST = gql`
  query MoreStrainsList($cursor: Int!) {
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

const useStyles = makeStyles({
  catalogPaper: {
    height: 600,
    width: "100%",
  },
  listHeaders: {
    borderBottom: "1px solid #888",
    // backgroundColor: "#DCDCDC",
  },
  list: {
    padding: 0,
  },
})

const StrainCatalogList = ({ data, fetchMore, cursor }) => {
  const classes = useStyles()

  const loadMoreItems = () =>
    fetchMore({
      query: GET_MORE_STRAINS_LIST,
      variables: {
        cursor: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult
        const previousEntry = previousResult.listStrains
        const newStrains = fetchMoreResult.listStrains.strains
        const newCursor = fetchMoreResult.listStrains.nextCursor
        const allStrains = [...previousEntry.strains, ...newStrains]

        return {
          listStrains: {
            nextCursor: newCursor,
            strains: [...new Set(allStrains)], // remove any duplicate entries
            __typename: previousEntry.__typename,
          },
        }
      },
    })

  return (
    <Paper className={classes.catalogPaper}>
      <List className={classes.list}>
        <ListItem className={classes.listHeaders}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={1}>
              <Checkbox
                color="default"
                value="selectAll"
                inputProps={{
                  "aria-label": "checkbox select all",
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <strong>Strain Descriptor</strong>
            </Grid>
            <Grid item xs={6}>
              <strong>Strain Summary</strong>
            </Grid>
            <Grid item xs={1}>
              <strong>Strain ID</strong>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </ListItem>
      </List>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={({ index }) => !!data[index]}
            itemCount={10000}
            loadMoreItems={loadMoreItems}>
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                onItemsRendered={onItemsRendered}
                ref={ref}
                height={535}
                width={width}
                itemSize={50}
                itemCount={data.length}
                itemData={data}>
                {StrainCatalogListItem}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Paper>
  )
}

export default StrainCatalogList
