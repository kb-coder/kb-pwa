type FetchParams = Parameters<typeof window.fetch>
type FetchInput = FetchParams[0]
type FetchInit = FetchParams[1]

const fetchJson = <T>(input: FetchInput, init: FetchInit = {}): Promise<T> => {
  return fetch(input, {
    ...init,
    headers: {
      ...init.headers
    }
  })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(new Error(resp?.statusText || 'Unknown error'))
      }

      return Promise.resolve(resp)
    })
    .then((resp) => resp.json() as Promise<T>)
}

export default fetchJson
