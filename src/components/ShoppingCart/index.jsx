// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { Flex, Box } from "rebass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cart from "./Cart"
import {
  DictyHeader,
  Container,
  AlertBox,
  PrimaryLargeButton,
  SuccessLargeButton,
} from "styles"
import type { MapStateToProps } from "react-redux"

type Props = {
  addedItems: Array<Object>,
}

class ShoppingCart extends Component<Props> {
  renderAlert = () => (
    <Flex wrap justify="center">
      <Box w={["85%", 2 / 3]}>
        <AlertBox>
          <strong>
            <FontAwesomeIcon icon="exclamation-circle" />
          </strong>{" "}
          There are no items in your cart.
        </AlertBox>
      </Box>
    </Flex>
  )
  render() {
    return (
      <Container>
        <Helmet>
          <title>Shopping Cart - Dicty Stock Center</title>
          <meta
            name="description"
            content="Shopping cart page for Dicty Stock Center"
          />
        </Helmet>
        <Flex justify="center">
          <Box>
            <DictyHeader>
              <h1>Shopping Cart</h1>
            </DictyHeader>
          </Box>
        </Flex>
        {this.props.addedItems.length > 0 ? (
          <div>
            <Flex justify="center" wrap>
              <Box w={1}>
                <Cart />
              </Box>
            </Flex>
            <Flex wrap justify="center">
              <Box w={[1, "40%"]} mt={10} mr={1}>
                <Link to="/strains">
                  <PrimaryLargeButton>
                    <FontAwesomeIcon icon="share" /> Continue Shopping
                  </PrimaryLargeButton>
                </Link>
              </Box>
              <Box w={[1, "40%"]} mt={10} mr={1}>
                <Link to="/order/shipping">
                  <SuccessLargeButton>
                    <FontAwesomeIcon icon="shopping-cart" /> Checkout
                  </SuccessLargeButton>
                </Link>
              </Box>
            </Flex>
          </div>
        ) : (
          this.renderAlert()
        )}
      </Container>
    )
  }
}

const mapStateToProps: MapStateToProps<*, *, *> = state => ({
  addedItems: state.cart.addedItems,
})

export default connect(mapStateToProps)(ShoppingCart)
