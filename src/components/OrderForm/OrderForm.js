/* eslint-disable react/jsx-no-bind */
// @flow
import React from "react"
import { Form, Formik } from "formik"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ShippingPage from "./Shipping/ShippingPage"
import PaymentPage from "./Payment/PaymentPage"
import SubmitPage from "./Submit/SubmitPage"
import validationSchema from "./validationSchema"
import styles from "./formStyles"

const pages = [ShippingPage, PaymentPage, SubmitPage]

const initialValues = {
  firstName: "",
  lastName: "",
}

type Props = {
  classes: Object,
}

type State = {
  page: number,
}

class OrderForm extends React.PureComponent<Props, State> {
  state = {
    page: 0,
  }

  submit = (values: any) => {
    console.log("values: ", values)
  }

  prevPage = () => this.setState(state => ({ page: state.page - 1 }))
  nextPage = () => this.setState(state => ({ page: state.page + 1 }))

  render() {
    const { classes } = this.props
    const PageComponent = pages[this.state.page]

    return (
      <Grid container spacing={16} className={classes.layout}>
        <Grid item xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.submit}
            render={props => (
              <Form>
                <PageComponent {...props} />
                <br />
                <Grid container justify="flex-end">
                  <Grid item>
                    {this.state.page > 0 && (
                      <Button type="primary" onClick={this.prevPage}>
                        <FontAwesomeIcon icon="arrow-circle-left" />
                        &nbsp; Previous
                      </Button>
                    )}
                    {this.state.page === pages.length - 1 ? (
                      <Button type="submit">
                        Submit Order &nbsp;
                        <FontAwesomeIcon icon="check-circle" />
                      </Button>
                    ) : (
                      <Button type="primary" onClick={this.nextPage}>
                        Continue &nbsp;
                        <FontAwesomeIcon icon="arrow-circle-right" />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(OrderForm)
