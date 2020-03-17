import React from "react"
import Grid from "@material-ui/core/Grid"
import LeftColumn from "../LeftColumn"
import ShippingPageRightColumn from "./ShippingPageRightColumn"

/**
 * ShippingPage is the display component for when the user is entering shipping information.
 */

const ShippingPage = (props: any) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <LeftColumn page="Shipping" countryName="country" {...props} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid container direction="column" spacing={2}>
        <ShippingPageRightColumn {...props} />
      </Grid>
    </Grid>
  </Grid>
)

export default ShippingPage