// @flow
import React, { useState } from "react"
import { Link } from "react-router-dom"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import AddToCartButton from "components/Stocks/CatalogPageItems/AddToCartButton"
import useStyles from "components/Stocks/DetailsPageItems/detailsStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StrainDetailsProps } from "components/Stocks/types/Props"

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const StrainAvailabilityCard = ({ data }: StrainDetailsProps) => {
  const [quantity, setQuantity] = useState(values[0])
  const classes = useStyles()

  const handleChange = event => {
    setQuantity(event.target.value)
  }

  return (
    <Card raised className={classes.availabilityCard}>
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
          data={[
            {
              id: data.id,
              label: data.label,
              summary: data.summary,
            },
          ]}
          setHover={() => {}}
          stockType="strain"
        />
      </div>
      <Divider />
      <Button
        component={Link}
        to="/order/checkout"
        variant="outlined"
        classes={{
          root: classes.checkoutBtn,
        }}
        fullWidth>
        <FontAwesomeIcon
          icon="arrow-right"
          size="sm"
          className={classes.arrowIcon}
        />
        Go to checkout page
      </Button>
    </Card>
  )
}

export default StrainAvailabilityCard
