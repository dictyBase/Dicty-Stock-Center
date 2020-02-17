import { useEffect, useState } from "react"
import footerItems from "constants/Footer"

type FooterJson = {
  data: Array<{
    attributes: {
      display: string
      items: Array<{
        label: string
        link: string
      }>
    }
  }>
}

const footerUrl = process.env.REACT_APP_FOOTER_JSON

const footerDataFormatter = (json: FooterJson) =>
  json.data.map(item => {
    const footerItems = item.attributes.items.map(c => ({
      description: c.label,
      link: c.link,
    }))
    return [
      {
        header: {
          description: item.attributes.display,
        },
        items: footerItems,
      },
    ]
  })

/**
 * useFooter is a hook for fetching dictyBase footer
 * JSON data. It uses an included JSON file as its
 * initial state then replaces it with fetched data
 * on a successful request.
 */

const useFooter = () => {
  const [footerData, setFooterData] = useState<any>(footerItems)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchFooter = async () => {
      setLoading(true)
      try {
        const res = await fetch(footerUrl)
        const json = await res.json()
        if (res.ok) {
          const footerArr = footerDataFormatter(json)
          setFooterData(footerArr)
        } else {
          setError(res.statusText)
        }
        setLoading(false)
      } catch (error) {
        setError(error.toString())
      }
    }
    fetchFooter()
  }, [])

  return { footerData, loading, error }
}

export default useFooter
