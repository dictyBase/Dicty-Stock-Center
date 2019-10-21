import React from "react"
import { shallow } from "enzyme"
import PlasmidDetailsList from "./PlasmidDetailsList"
import ItemDisplay from "components/Stocks/DetailsPageItems/ItemDisplay"
import LeftDisplay from "components/Stocks/DetailsPageItems/LeftDisplay"
import RightDisplay from "components/Stocks/DetailsPageItems/RightDisplay"
import { data } from "./mockPlasmidData"

describe("Stocks/Plasmids/PlasmidDetailsList", () => {
  const wrapper = shallow(<PlasmidDetailsList data={data} />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(ItemDisplay)).toHaveLength(7)
      expect(wrapper.find(LeftDisplay)).toHaveLength(10)
      expect(wrapper.find(RightDisplay)).toHaveLength(6)
    })
  })
})