import usePublicationFetch from "./usePublicationFetch"
import { renderHook, cleanup } from "react-hooks-testing-library"

const publications = [
  {
    id: "123456",
    doi: "10.1074/test.m892301",
  },
]

describe("Stocks/Details/common/hooks/usePublicationFetch", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve({
            ok: true,
            status: 200,
            text: () => Promise.resolve("this is test data"),
          })
        }),
    )
  })
  afterEach(() => cleanup)
  it("renders with expected values when first fetching", () => {
    const {
      result: { current },
    } = renderHook(() => usePublicationFetch(publications))
    expect(current.error).toEqual(null)
    expect(current.data).toEqual([])
    expect(current.loading).toEqual(true)
  })

  it("fetches with correct doi url", () => {
    renderHook(() => usePublicationFetch(publications))
    expect(fetch).toBeCalledWith(`https://doi.org/${publications[0].doi}`, {
      headers: new Headers({
        Accept: "text/x-bibliography; style=apa-no-doi-no-issue",
      }),
    })
  })

  it("resolves the promise correctly", async () => {
    let { result, waitForNextUpdate } = renderHook(() =>
      usePublicationFetch(publications),
    )
    await waitForNextUpdate()
    expect(result.current.loading).toEqual(false)
    expect(result.current.error).toEqual(null)
    expect(result.current.data).toEqual([
      {
        data: "this is test data",
        id: "123456",
      },
    ])
  })

  it("rejects the promise correctly", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        error: "this is a test error",
      }),
    )
    let { result, waitForNextUpdate } = renderHook(() =>
      usePublicationFetch(publications),
    )
    await waitForNextUpdate()
    expect(result.current.error).toEqual({
      error: "this is a test error",
    })
    expect(result.current.data).toEqual([])
  })
})
