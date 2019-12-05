// @flow
import React from "react"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import useStyles from "components/Stocks/Details/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AddToCartButton from "components/Stocks/Catalogs/common/AddToCartButton"

const values = [...Array(13).keys()].slice(1)

type Props = {
  cartData: {
    /** Stock ID */
    id: string,
    /** Stock name (label/descriptor) */
    name: string,
    /** Stock summary */
    summary: string,
    /** Strain or plasmid */
    type: string,
  },
}

/**
 * AvailableCardDisplay is used on stock details pages if the
 * item is currently available for ordering.
 */

const AvailableCardDisplay = ({ cartData }: Props) => {
  const [quantity, setQuantity] = React.useState(values[0])
  const classes = useStyles()
  // const items = useSelector(state => state.cart.addedItems)
  // const itemInCart = items.some(item => item.id === cartData.id)

  const handleChange = event => {
    setQuantity(event.target.value)
  }

  return (
    <div>
      <Typography variant="h6" className={classes.cardHeader}>
        <FontAwesomeIcon icon="check" /> Available
      </Typography>
      <Divider />
      <div className={classes.quantity}>
        <TextField
          id="outlined-quantity"
          select
          label="Quantity"
          value={quantity}
          onChange={handleChange}
          margin="dense"
          variant="outlined"
          inputProps={{ className: classes.textField }}>
          {values.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <AddToCartButton
          data={Array(quantity).fill(cartData)}
          setHover={() => {}}
          stockType={cartData.type}
        />
      </div>
      <Divider />
      <Button
        component={Link}
        to="/cart"
        classes={{
          root: classes.checkoutBtn,
        }}
        fullWidth>
        <FontAwesomeIcon
          icon="arrow-right"
          size="sm"
          className={classes.arrowIcon}
        />
        Go to Cart
      </Button>
    </div>
  )
}

export default AvailableCardDisplay
