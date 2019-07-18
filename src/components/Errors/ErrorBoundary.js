import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import sadDicty from "static/sad-dicty.png"
import styles from "./errorStyles"

/**
 * This is an ErrorBoundary wrapper that catches any
 * JavaScript errors and provides a fallback UI.
 */

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null }

  componentDidCatch(error, errorInfo) {
    // catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { errorInfo, error } = this.state
    const { children, classes } = this.props

    if (errorInfo) {
      return (
        <Grid className={classes.gridContainer} container justify="center">
          <Grid item xs={6} className={classes.paper}>
            <center>
              <img src={sadDicty} alt="Sad Dicty Logo" />
              <h2>Sorry! There was an error loading this page.</h2>
              <p>Something went wrong behind the scenes.</p>
              <em>{error && error.toString()}</em>
              <p>
                If the problem persists, please email us at{" "}
                <a href="mailto:dictybase@northwestern.edu">
                  dictybase@northwestern.edu
                </a>
                .
              </p>
            </center>
          </Grid>
        </Grid>
      )
    }
    // normally, just render children
    return children
  }
}

export default withStyles(styles)(ErrorBoundary)
