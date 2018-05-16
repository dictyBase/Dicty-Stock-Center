// @flow
import React from "react"
import { connect } from "react-redux"
import { Panel, PanelBody } from "dicty-components-panel"
import { Link } from "react-router-dom"
import { Flex, Box } from "rebass"
import { Container, DictyHeader, Breadcrumb } from "styles"
import FontAwesome from "react-fontawesome"
import type { MapStateToProps } from "react-redux"

type Props = {
  /** the object that contains auth data from current state */
  auth: Object
}

/**
 * Personalized component that displays the user's login information (ID, email, name, provider)
 */

export const MyDsc = (props: Props) => {
  const { auth } = props
  return (
    <Container>
      <Flex wrap justify="center">
        <Box w={1}>
          <Breadcrumb>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>My DSC</li>
          </Breadcrumb>
        </Box>
        <Box w={1}>
          <DictyHeader>
            <h2>My DSC</h2>
          </DictyHeader>
        </Box>
        <Box w={3 / 4}>
          <Panel collapse>
            <PanelBody>
              <h1>
                <FontAwesome name="user" /> Personal Information
              </h1>
              <hr />
              {auth.user.data.id && <h3>Id: {auth.user.data.id}</h3>}
              {auth.user.data.attributes.email && (
                <h3>Email: {auth.user.data.attributes.email}</h3>
              )}
              {auth.user.data.attributes.name && (
                <h3>Name: {auth.user.data.attributes.name}</h3>
              )}
              <h3>Provider: {auth.provider}</h3>
            </PanelBody>
          </Panel>
        </Box>
      </Flex>
    </Container>
  )
}

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(MyDsc)
