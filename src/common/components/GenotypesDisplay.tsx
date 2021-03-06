import React from "react"
import useGenotypes from "common/hooks/useGenotypes"

// formatElements adds comma to each element except for the last one
const formatElements = (item: string, index: number) =>
  (index ? "," : "") + item

type Props = {
  /** List of genotypes in string format */
  genotypes: string
}

/**
 * GenotypesDisplay organizes genotypes with non drug resistances italicized
 * and with drug resistances at the end
 */
const GenotypesDisplay = ({ genotypes }: Props) => {
  const { nonDrugResistances, drugResistances } = useGenotypes(genotypes)

  return (
    <span data-testid="all-genotypes">
      <em data-testid="italicized-genotypes">
        {nonDrugResistances.map((item: string, index: number) =>
          drugResistances.length ? `${item},` : formatElements(item, index),
        )}
      </em>
      {drugResistances.map(formatElements)}
    </span>
  )
}

export default GenotypesDisplay
