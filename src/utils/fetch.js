export const status = response => {
  // HTTP response codes 2xx indicate that the request was processed successfully
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
}

export const json = response => {
    return response.json()
}
