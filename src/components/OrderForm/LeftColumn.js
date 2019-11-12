// @flow
import React from "react"
import PanelWrapper from "components/common/PanelWrapper"
import AddressFields from "./AddressFields"
import addressFieldsGenerator from "./utils/addressFields"

type Props = {
  /** Values from Formik */
  values: Object,
  page: string,
  countryName: string,
  setFieldValue: Function,
}

/**
 * LeftColumn is the display of the left column on the shipping
 * and payment order form pages.
 */

const LeftColumn = (props: Props) => {
  const { page, countryName, setFieldValue, values } = props

  return (
    <PanelWrapper title={`${page} Address`}>
      <AddressFields
        fields={addressFieldsGenerator(page.toLowerCase())}
        countryName={countryName}
        countryValue={values[countryName]}
        setFieldValue={setFieldValue}
      />
    </PanelWrapper>
  )
}

export default LeftColumn
