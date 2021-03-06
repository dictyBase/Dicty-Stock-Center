import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ShoppingCartPageWithItems from "./ShoppingCartPageWithItems"
import { MockCartProvider } from "common/utils/testing"
import { fees } from "common/constants/fees"

describe("features/ShoppingCart/ShoppingCartPageWithItems", () => {
  const addedItems = [
    {
      id: "DBS123456",
      name: "jerry seinfeld",
      summary: "comedian",
      fee: fees.STRAIN_FEE,
    },
    {
      id: "DBS123456",
      name: "jerry seinfeld",
      summary: "comedian",
      fee: fees.STRAIN_FEE,
    },
    {
      id: "DBP999999",
      name: "larry david",
      summary: "comedian",
      fee: fees.PLASMID_FEE,
    },
    {
      id: "DBS123456",
      name: "jerry seinfeld",
      summary: "comedian",
      fee: fees.STRAIN_FEE,
    },
  ]
  describe("initial render", () => {
    it("displays correct total", () => {
      render(
        <MockCartProvider mocks={[]} addedItems={addedItems}>
          <ShoppingCartPageWithItems />
        </MockCartProvider>,
      )
      // three strains ($30 each) + one plasmid ($15) = $75
      const total = screen.getByText("$105.00")
      expect(total).toBeInTheDocument()
    })
  })

  describe("button clicking", () => {
    it("updates quantity on trash button click", () => {
      render(
        <MockCartProvider mocks={[]} addedItems={addedItems}>
          <ShoppingCartPageWithItems />
        </MockCartProvider>,
      )
      const strainQuantity = screen.getAllByTestId("cart-quantity")[0]
      expect(strainQuantity).toHaveTextContent(/Qty3/)
      const trashButtons = screen.getAllByRole("button", {
        name: "Remove Item",
      })
      // should have two buttons - one for each item row
      expect(trashButtons).toHaveLength(2)
      // click trash button on row with multiple of strain
      userEvent.click(trashButtons[0])
      // now all of those items from that row will be removed
      // leaving one trash button
      expect(
        screen.getByRole("button", {
          name: "Remove Item",
        }),
      ).toBeInTheDocument()
    })
  })
})
