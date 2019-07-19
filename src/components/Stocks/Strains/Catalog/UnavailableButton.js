// @flow
import React from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TableCell from "@material-ui/core/TableCell"
import styles from "components/Stocks/Strains/strainStyles"

/**
 * UnavailableButton is displayed when a stock is not available
 * for purchase.
 */

const UnavailableButton = ({ classes, rowHeight }) => (
  <TableCell
    component="div"
    className={classNames(classes.flexContainer, classes.tableCell)}
    variant="head"
    style={{ height: rowHeight }}>
    <strong>
      <Button disabled>Not available</Button>
    </strong>
  </TableCell>
)

export default withStyles(styles)(UnavailableButton)
