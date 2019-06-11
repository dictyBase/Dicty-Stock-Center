import React from "react"
import { shallow } from "enzyme"
import PaymentContactInformation from "./PaymentContactInformation"
import Grid from "@material-ui/core/Grid"
import TextField from "../TextField"

describe("OrderForm/Payment/ContactInformation", () => {
  const props = {
    classes: {
      requiredText: "requiredText",
    },
  }
  const wrapper = shallow(<PaymentContactInformation {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find(Grid)).toHaveLength(2)
      expect(wrapper.dive().find(TextField)).toHaveLength(1)
    })
  })
})