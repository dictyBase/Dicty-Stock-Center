const callAPI = ({ dispatch, getState }) => {
  return next => async action => {
    const {
      types,
      url,
      config,
      onFail = () => {},
      shouldCallAPI = () => true
    } = action

    if (!types) {
      // normal action: pass it on
      return next(action)
    }

    // make sure types matches expected three item array
    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.")
    }

    // if no API call is necessary, return
    if (!shouldCallAPI(getState())) {
      return
    }

    // helper function to print HTTP errors to console
    // responses are structured in JSONAPI format
    const printError = (res, json) => {
      console.error("HTTP Error")
      console.error(
        `HTTP Response: ${res.status}
      Title: ${json.errors[0].title}
      Detail: ${json.errors[0].detail}`
      )
    }

    const [requestType, successType, failureType] = types

    dispatch({
      type: requestType,
      payload: {
        isFetching: true
      }
    })

    try {
      const res = await fetch(url, config)
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/vnd.api+json")) {
        const json = await res.json()
        if (res.ok) {
          return next({
            type: successType,
            payload: {
              isFetching: false,
              json
            }
          })
        } else {
          if (process.env.NODE_ENV !== "production") {
            printError(res, json)
          }
          onFail(dispatch)
          return next({
            type: failureType,
            payload: {
              error: json.errors[0].title
            }
          })
        }
      } else {
        onFail(dispatch)
        return next({
          type: failureType,
          payload: {
            error: res.body
          }
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
      onFail(dispatch)
      return next({
        type: failureType,
        payload: {
          error: error.toString()
        }
      })
    }
  }
}

export default callAPI