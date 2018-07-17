import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import { Homepage } from "./Homepage"

test("matching a snapshot of Home/Homepage", () => {
  const props = {
    user: {},
    fullName: "Jane Doe",
  }
  const subject = shallow(<Homepage {...props} />)
  expect(toJson(subject)).toMatchSnapshot()
})
