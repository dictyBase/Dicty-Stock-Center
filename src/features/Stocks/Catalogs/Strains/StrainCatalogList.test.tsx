import React from "react"
import { mount } from "enzyme"
import StrainCatalogList from "./StrainCatalogList"
import { data } from "./mockStrainCatalogData"
import AutoSizer from "react-virtualized-auto-sizer"
import Paper from "@material-ui/core/Paper"
import CatalogListHeader from "features/Stocks/Catalogs/common/CatalogListHeader"
import { CatalogProvider } from "features/Stocks/Catalogs/common/CatalogContext"
import { CartProvider } from "features/ShoppingCart/CartStore"

describe("Stocks/Strains/StrainCatalogList", () => {
  const props = {
    data: data,
  }
  const wrapper = mount(
    <CartProvider>
      <CatalogProvider>
        <StrainCatalogList {...props} />
      </CatalogProvider>
    </CartProvider>,
  )
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(Paper)).toHaveLength(1)
      expect(wrapper.find(CatalogListHeader)).toHaveLength(1)
      expect(wrapper.find(AutoSizer)).toHaveLength(1)
    })
  })
})
