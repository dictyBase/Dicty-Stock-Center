import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Publication } from "features/Stocks/Details/types"

const useStyles = makeStyles({
  bold: {
    fontWeight: 700,
  },
})

// get author last names, replace last element with "&"
// example return: "Samereier, Baumann, Meyer & Gräf (2010)"
const listAuthors = (authors: Publication["authors"]) => {
  const lastNames = authors.map((author) => author.last_name)
  const finalName = lastNames.pop()
  return lastNames.length ? lastNames.join(", ") + " & " + finalName : finalName
}

// get the year from a timestamp in format of "2004-06-11T00:00:00.000Z"
const getYearFromTimestamp = (date: string) => {
  const newDate = new Date(date)
  return newDate.getFullYear()
}

type Props = {
  /** List of publications */
  publications?: Array<Publication>
}

/**
 * PublicationsDisplay handles the display of publications, primarily for use
 * on the stock details pages.
 */
const PublicationsDisplay = ({ publications }: Props) => {
  const classes = useStyles()

  if (!publications) {
    return <div />
  }

  return (
    <div>
      {publications.map((publication, index) => (
        <span data-testid="phenotype-publication-display" key={index}>
          <span className={classes.bold}>
            {listAuthors(publication.authors)} (
            {getYearFromTimestamp(publication.pub_date)})
          </span>{" "}
          '{publication.title}' <em>{publication.journal}</em>{" "}
          {publication.volume}:{publication.pages}{" "}
          <a
            href={`/publication/${publication.id}`}
            title="Visit dictyBase publication page">
            <FontAwesomeIcon icon="external-link-alt" size="sm" />
          </a>
        </span>
      ))}
    </div>
  )
}

export { listAuthors, getYearFromTimestamp }
export default PublicationsDisplay