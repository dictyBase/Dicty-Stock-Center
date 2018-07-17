// @flow
import React from "react"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "utils/headerItems"
import Cart from "components/Cart"
import RenderRoutes from "routes/RenderRoutes"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { FooterLinks } from "constants/Footer"
import { NavbarLinks } from "constants/Navbar"
import { MainBodyContainer } from "styles"
import type { MapStateToProps } from "react-redux"

type Props = {
  cart: Object,
  auth: Object,
}

export const App = (props: Props) => {
  return (
    <div>
      {props.auth.isAuthenticated ? (
        <Header items={loggedHeaderItems}>
          {items => items.map(generateLinks)}
        </Header>
      ) : (
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      )}
      <br />
      <Navbar items={NavbarLinks} />
      <br />
      <Cart cart={props.cart} />
      <MainBodyContainer>
        <RenderRoutes {...props} />
      </MainBodyContainer>
      <Footer items={FooterLinks} />
    </div>
  )
}

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth, cart }) => ({
  auth,
  cart,
})

export default withRouter(connect(mapStateToProps)(App))
