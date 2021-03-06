import React from "react"
import { useMutation } from "@apollo/client"
import { useHistory, useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { PageEditor } from "dicty-components-page-editor"
import useAuthorization from "common/hooks/useAuthorization"
import { useAuthStore } from "features/Authentication/AuthStore"
import { UPDATE_CONTENT } from "common/graphql/mutations"
import { Content } from "./types"

const useStyles = makeStyles((theme) => ({
  editor: {
    "& a": {
      cursor: "pointer",
    },
  },
  error: {
    textAlign: "center",
    marginTop: 50,
  },
}))

type Params = {
  /** Slug name from URL */
  name: string
}

type Props = {
  location: {
    state: {
      data: Content
    }
  }
}

/**
 * Allows editing of the info page components (i.e. Deposit, Payment, Order)
 */
const EditInfoPage = ({ location }: Props) => {
  const classes = useStyles()
  const [{ token }] = useAuthStore()
  const {
    state: { data },
  } = location
  const { user } = useAuthorization()
  const [updateContent] = useMutation(UPDATE_CONTENT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const history = useHistory()
  const { name } = useParams<Params>()

  const prevURL = `/information/${name}`

  const onSave = (value: any) => {
    updateContent({
      variables: {
        input: {
          id: data.id,
          updated_by: user.id,
          content: JSON.stringify(value.toJSON()),
        },
      },
    })
    setTimeout(() => history.push(prevURL), 1000)
  }

  const onCancel = () => {
    history.push(prevURL)
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <div className={classes.editor}>
          <PageEditor
            pageContent={data.content}
            onCancel={onCancel}
            onSave={onSave}
            readOnly={false}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default EditInfoPage
