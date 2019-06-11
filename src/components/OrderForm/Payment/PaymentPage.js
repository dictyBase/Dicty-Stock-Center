// @flow
import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PanelWrapper from "components/common/PanelWrapper"
import PaymentAddress from "./PaymentAddress"
import PaymentMethod from "./PaymentMethod"
import PaymentInfoBox from "./PaymentInfoBox"
import styles from "../formStyles"

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Function to manually set Formik field values */
  setFieldValue: Function,
  /** Values from Formik */
  values: Object,
  /** Current order form page number */
  pageNum: Number,
  /** Function to set the page number */
  setPageNum: Function,
}

/**
 * PaymentPage is the display component for when the user is entering payment information.
 */

const PaymentPage = (props: Props) => {
  const [checkbox, toggleCheckbox] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { classes, setFieldValue, values, pageNum, setPageNum } = props

  const validationChecker = () => {
    const fields = [
      values.payerFirstName,
      values.payerLastName,
      values.payerEmail,
      values.payerOrganization,
      values.payerLab,
      values.payerAddress1,
      values.payerCity,
      values.payerZip,
      values.payerCountry,
      values.payerPhone,
      values.purchaseOrderNum,
    ]

    if (fields.includes("")) {
      setModalOpen(true)
      setPageNum(1)
    }
  }

  const handleChange = () => {
    toggleCheckbox(!checkbox)
    setFieldValue("payerFirstName", values.firstName)
    setFieldValue("payerLastName", values.lastName)
    setFieldValue("payerEmail", values.email)
    setFieldValue("payerOrganization", values.organization)
    setFieldValue("payerLab", values.lab)
    setFieldValue("payerAddress1", values.address1)
    setFieldValue("payerAddress2", values.address2)
    setFieldValue("payerCity", values.city)
    setFieldValue("payerState", values.state)
    setFieldValue("payerZip", values.zip)
    setFieldValue("payerCountry", values.country)
    setFieldValue("payerPhone", values.phone)
  }

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <div className={classes.header}>Please enter payment information</div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkbox}
              onChange={handleChange}
              value="sameAsShipping"
            />
          }
          label="Same as shipping (click here if payer address is the same as shipping address)"
        />
      </Grid>
      <Grid item xs={6}>
        <PanelWrapper title="Payment Address">
          <PaymentAddress {...props} />
        </PanelWrapper>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column" spacing={16}>
          <Grid item xs={12}>
            <PanelWrapper title="Payment Method">
              <PaymentMethod {...props} />
            </PanelWrapper>
          </Grid>
          <Grid item xs={12}>
            <PaymentInfoBox />
          </Grid>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={6}>
              <Button
                color="primary"
                size="large"
                className={classes.previousBtn}
                onClick={() => setPageNum(pageNum - 1)}>
                <FontAwesomeIcon icon="arrow-circle-left" />
                &nbsp; Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                className={classes.continueBtn}
                onClick={() => {
                  setPageNum(pageNum + 1)
                  validationChecker()
                }}>
                Continue &nbsp;
                <FontAwesomeIcon icon="arrow-circle-right" />
              </Button>
              {modalOpen && (
                <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                  <DialogTitle>{"Validation error"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Some fields are missing. Please ensure that you have
                      filled out all required fields and try again.
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PaymentPage)