// @flow
import { HeaderLink } from "dicty-components-header-footer"
import { Link } from "react-router-dom"
import React from "react"
import FontAwesome from "react-fontawesome"

const generateLinks = (link: Object, i: string) => {
  return link.isRouter ? (
    <Link key={i} to={link.url}>
      <FontAwesome name={link.icon} />&nbsp;
      {link.text}&nbsp;
    </Link>
  ) : (
    <HeaderLink key={i} href={link.url}>
      <FontAwesome name={link.icon} />&nbsp;
      {link.text}&nbsp;
    </HeaderLink>
  )
}

const headerItems = [
  {
    url: "/cite",
    icon: "plus",
    text: "Cite Us"
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads"
  },
  {
    url: "/info",
    icon: "info-circle",
    text: "About dictyBase"
  },
  {
    url: "/login",
    icon: "sign-in",
    text: "Login",
    isRouter: true
  }
]

const loggedHeaderItems = [
  {
    url: "/cite",
    icon: "plus",
    text: "Cite Us"
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads"
  },
  {
    url: "/info",
    icon: "info-circle",
    text: "About dictyBase"
  },
  {
    url: "/mydsc",
    icon: "user",
    text: "MyDSC",
    isRouter: true
  },
  {
    url: "/logout",
    icon: "sign-out",
    text: "Logout",
    isRouter: true
  }
]

export { headerItems, loggedHeaderItems, generateLinks }
