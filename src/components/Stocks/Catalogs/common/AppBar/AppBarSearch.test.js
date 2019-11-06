import React from "react"
import { mount } from "enzyme"
import AppBarSearch from "./AppBarSearch"
import AppBarDropdown from "./AppBarDropdown"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AppBarProvider } from "./AppBarContext"

describe("Stocks/Strains/Catalog/AppBarSearch", () => {
  describe("initial render", () => {
    const props = {
      dropdownItems: [],
      query: "test query",
      setQuery: jest.fn(),
      setQueryVariables: jest.fn(),
    }
    const wrapper = mount(
      <AppBarProvider>
        <AppBarSearch {...props} />
      </AppBarProvider>,
    )
    it("always renders initial components", () => {
      expect(wrapper.find(IconButton)).toHaveLength(2)
      expect(wrapper.find(FontAwesomeIcon)).toHaveLength(2)
      expect(wrapper.find(AppBarDropdown)).toHaveLength(1)
    })
  })
})