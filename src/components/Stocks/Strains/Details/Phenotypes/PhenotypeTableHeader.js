// @flow
import React from "react"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import useStyles from "./phenotypeStyles"

const columnData = [
  {
    id: "phenotype",
    label: "Phenotype",
  },
  { id: "notes", label: "Notes" },
  { id: "assay-environment", label: "Assay & Environment" },
  { id: "reference", label: "Reference" },
  { id: "", label: "" },
]

type Props = {
  /** The order to sort the column */
  order: any,
  /** The item to be ordered by */
  orderBy: string,
  /** Function for handling sorting */
  onRequestSort: Function,
}

/**
 * PhenotypeTableHeader is used to display the header for PhenotypeTable.
 */

const PhenotypeTableHeader = (props: Props) => {
  const classes = useStyles()
  const { order, orderBy, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead className={classes.head}>
      <TableRow>
        {columnData.map((column: Object) => (
          <TableCell
            key={column.id}
            className={classes.headerCell}
            sortDirection={orderBy === column.id ? order : false}>
            <TableSortLabel
              active={orderBy === column.id}
              direction={order}
              onClick={createSortHandler(column.id)}
              className={classes.headerCell}>
              <h3>{column.label}</h3>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default PhenotypeTableHeader