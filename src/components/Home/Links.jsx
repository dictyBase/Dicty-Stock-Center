// @flow
import React from "react"
import LinkList from "../LinkList"
import { PanelBlue } from "styles"

const content = [
  { name: "Contact the DSC", to: "/contact", routerAware: true },
  { name: "DSC FAQ", to: "/information/faq", routerAware: true },
  {
    name: "Nomenclature Guide",
    to: "/information/nomenclature-guide",
    routerAware: false
  },
  {
    name: "Other Stock Centers",
    to: "/information/other-stock-centers",
    routerAware: true
  }
]

/**
 * Displays misc links
 */

const Links = () => {
  return (
    <PanelBlue>
      <LinkList list={content} />
    </PanelBlue>
  )
}

export default Links
