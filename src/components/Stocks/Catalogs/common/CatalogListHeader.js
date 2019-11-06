// @flow
import React from "react"
import { makeStyles } from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Checkbox from "@material-ui/core/Checkbox"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AddToCartButton from "./AddToCartButton"
import StrainCatalogListHeader from "components/Stocks/Catalogs/Strains/StrainCatalogListHeader"
import PlasmidCatalogListHeader from "components/Stocks/Catalogs/Plasmids/PlasmidCatalogListHeader"

const useStyles = makeStyles({
  listHeaders: {
    borderBottom: "1px solid #888",
    backgroundColor: "#f6f9fc",
    color: "#525f7f",
    fontWeight: 600,
  },
  list: {
    padding: 0,
  },
  button: {
    color: "#004080",
  },
})

type Props = {
  checkedItems: Array<{
    id: string,
    label?: string,
    name?: string,
    summary: string,
  }>,
  /** Function for controlling checked items array */
  setCheckedItems: Function,
  /** Function for handling the "check all" box */
  handleCheckAllChange: Function,
  /** Type of stock (strain or plasmid) */
  stockType: string,
}

/**
 * CatalogListHeader contains the list of headers (i.e.
 * descriptor, summary, etc) at the top of the catalog page.
 */

const CatalogListHeader = ({
  stockType,
  checkedItems,
  setCheckedItems,
  handleCheckAllChange,
}: Props) => {
  const classes = useStyles()
  const checkedItemsLength = checkedItems.length

  let content

  if (checkedItemsLength > 0) {
    content = (
      <>
        {checkedItemsLength} items selected
        <AddToCartButton
          data={checkedItems}
          setCheckedItems={setCheckedItems}
          stockType={stockType}
        />
        <IconButton
          size="medium"
          className={classes.button}
          onClick={() => {}}
          title="Download PDF"
          aria-label="Download PDF">
          <FontAwesomeIcon icon="download" />
        </IconButton>
      </>
    )
  } else {
    content =
      stockType === "strain" ? (
        <StrainCatalogListHeader />
      ) : (
        <PlasmidCatalogListHeader />
      )
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listHeaders}>
        <Grid container spacing={0} alignItems="center">
          <Hidden smDown>
            <Grid item md={1}>
              {checkedItemsLength > 0 && (
                <Checkbox
                  indeterminate={checkedItemsLength > 0 ? true : false}
                  color="default"
                  value="selectAll"
                  onChange={handleCheckAllChange}
                  inputProps={{
                    "aria-label": "checkbox select all",
                  }}
                />
              )}
            </Grid>
          </Hidden>
          {content}
        </Grid>
      </ListItem>
    </List>
  )
}

export default CatalogListHeader