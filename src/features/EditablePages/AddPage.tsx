import React from "react"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { PageEditor } from "dicty-components-page-editor"
import AddPageBanner from "./AddPageBanner"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import { CREATE_CONTENT } from "common/graphql/mutations"
import NAMESPACE from "common/constants/namespace"
import { theme } from "app/layout/AppProviders"

const newTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: "7px",
      },
    },
  },
})

/**
 * This is the view component so an authorized user can add a new page.
 */

const AddPage = () => {
  const [{ token }] = useAuthStore()
  const { user } = useAuthorization()
  const history = useHistory()
  const [createContent] = useMutation(CREATE_CONTENT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const [textValue, setTextValue] = React.useState("")
  const [textValueError, setTextValueError] = React.useState(false)

  const onSave = (value: any) => {
    if (textValue === "") {
      setTextValueError(true)
      return
    }
    createContent({
      variables: {
        input: {
          name: textValue,
          created_by: user.id,
          content: JSON.stringify(value.toJSON()),
          namespace: NAMESPACE,
        },
      },
    })
    setTimeout(() => {
      history.push(`/information/${textValue}`)
    }, 800)
  }

  const onCancel = () => {
    history.push("/information")
  }

  return (
    <ThemeProvider theme={newTheme}>
      <Grid container wrap="wrap" justify="center">
        <Grid item xs={12}>
          <AddPageBanner
            textValue={textValue}
            setTextValue={setTextValue}
            textValueError={textValueError}
            setTextValueError={setTextValueError}
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <PageEditor onCancel={onCancel} onSave={onSave} newPage={true} />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default AddPage
