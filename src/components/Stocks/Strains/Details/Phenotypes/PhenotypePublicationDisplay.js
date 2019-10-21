// @flow
import React, { Fragment } from "react"

type Props = {
  /** Publication data */
  data: {
    authors: Array<{
      last_name: string,
    }>,
    id: string,
    pub_date: string,
    title: string,
    journal: string,
    volume: string,
    pages: string,
  },
}

/**
 * PhenotypePublicationDisplay handles the display of the phenotype reference table cell.
 */

const PhenotypePublicationDisplay = ({ data }: Props) => {
  const lastNames = data.authors.map(item => item.last_name)

  return (
    <Fragment>
      <strong>
        {lastNames.join(", ")} ({data.pub_date.slice(0, 4)})
      </strong>{" "}
      '{data.title}' <em>{data.journal}</em> {data.volume}:{data.pages}
    </Fragment>
  )
}

PhenotypePublicationDisplay.defaultProps = {
  data: {
    authors: [],
    pub_date: "",
    title: "",
    journal: "",
    volume: "",
    pages: "",
  },
}

export default PhenotypePublicationDisplay