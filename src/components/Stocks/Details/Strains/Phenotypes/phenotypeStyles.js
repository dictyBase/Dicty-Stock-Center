// @flow
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  cell: {
    fontSize: "16px",
  },
  link: {
    textDecoration: "none",
    color: "#4C5E81",
    "&:visited": {
      color: "#4C5E81",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
  head: {
    backgroundColor: "#0059b3",
  },
  headerCell: {
    color: "#fff",
    fontWeight: "600",
  },
}))

export default useStyles