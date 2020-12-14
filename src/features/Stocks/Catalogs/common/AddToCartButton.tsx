import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import UnavailableButton from "./UnavailableButton"
import AddToCartDialog from "features/Stocks/Catalogs/common/AddToCartDialog"
import { useCartStore } from "features/ShoppingCart/CartStore"
import useCartItems from "common/hooks/useCartItems"
import { CartItem } from "common/types"

const useStyles = makeStyles(({ palette }) => ({
  cartButton: {
    color: palette.secondary.main,
  },
}))

type Props = {
  /** Stock data */
  data: Array<CartItem>
  /** Stock inventory status */
  inStock: boolean
  /** Function to add to checked items array */
  setCheckedItems?: (arg0: Array<CartItem>) => void
  /** Size of icon */
  size?: "small" | "medium" | undefined
}

/**
 * AddToCartButton appears on the catalog page if the stock is available
 * for purchase.
 */

export const AddToCartButton = ({
  data,
  inStock,
  setCheckedItems,
  size = "medium",
}: Props) => {
  const {
    state: { showCartDialog, maxItemsInCart },
  } = useCartStore()
  const { addToCart } = useCartItems()
  const classes = useStyles()

  let button = (
    <IconButton
      size={size}
      className={classes.cartButton}
      onClick={() => addToCart(data)}
      title="Add to cart"
      aria-label="Add to shopping cart">
      <FontAwesomeIcon icon="cart-plus" />
    </IconButton>
  )

  if (!inStock) {
    button = (
      <UnavailableButton title="Item is currently unavailable" size={size} />
    )
  }

  if (maxItemsInCart) {
    button = (
      <UnavailableButton title="Shopping cart is full" cartFull size={size} />
    )
  }

  return (
    <>
      <strong>{button}</strong>
      {showCartDialog && (
        <AddToCartDialog data={data} setCheckedItems={setCheckedItems} />
      )}
    </>
  )
}

export default AddToCartButton
