import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PageEditor } from "dicty-components-page-editor"
import useAuthorization from "hooks/useAuthorization"
import { UPDATE_CONTENT } from "graphql/mutations"

const useStyles = makeStyles(() => ({
  editButton: {
    fontSize: "0.9em",
    color: "#337ab7",
    textTransform: "none",
    "&:hover": {
      color: "#337ab7",
      backgroundColor: "transparent",
    },
  },
}))

type Props = {
  data: {
    id: string
    content: string
    slug: string
    updated_by: {
      email: string
      first_name: string
      last_name: string
      updated_at: string
      roles?: Array<{
        role: string
        permissions?: Array<{
          permission: string
          resource: string
        }>
      }>
    }
  }
}

/**
 * Inline editor for all inline editable content
 */

const InlineEditor = ({ data }: Props) => {
  const [readOnly, setReadOnly] = React.useState(true)
  const [value, setValue] = useState(data.content)
  const { canEditPages, verifiedToken, user } = useAuthorization()
  const [updateContent] = useMutation(UPDATE_CONTENT)
  const classes = useStyles()

  const onSave = value => {
    updateContent({
      variables: {
        input: {
          id: data.id,
          updated_by: user.id,
          content: JSON.stringify(value.toJSON()),
        },
      },
    })
    setValue(value)
    setReadOnly(true)
  }

  const onCancel = () => {
    setValue(value)
    setReadOnly(true)
  }

  if (readOnly) {
    return (
      <div>
        <PageEditor
          pageContent={data.content}
          readOnly={readOnly}
          onSave={onSave}
          onCancel={onCancel}
        />
        {canEditPages && verifiedToken && (
          <span>
            <Button
              className={classes.editButton}
              color="primary"
              onClick={() => setReadOnly(false)}
              title="Edit">
              <FontAwesomeIcon icon="pencil-alt" />
              &nbsp; Edit
            </Button>
          </span>
        )}
      </div>
    )
  }

  return (
    <PageEditor
      pageContent={data.content}
      readOnly={false}
      onSave={onSave}
      onCancel={onCancel}
    />
  )
}

export default InlineEditor