import { VITE_WITH_CREDENTIALS, VITE_FETCH_MODE } from '/config.js'

const http = async (method, url, body = null, query = null, headers = null) => {
  const qs = query
    ? '?' +
      Object.keys(query)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        )
        .join('&')
    : ''
  if (!headers) {
    headers = {
      Accept: 'application/json',
    }
  }
  const options = { method, headers }
  options.mode = VITE_FETCH_MODE
  options.credentials = VITE_WITH_CREDENTIALS
  if (body) {
    if (body instanceof FormData) {
      options.body = body
    } else {
      headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(body)
    }
  }
  const rv0 = await fetch(url + qs, options)
  rv0.data = await rv0.json()

  if (rv0.status >= 200 && rv0.status < 400) {
    return rv0
  } else {
    throw rv0
  }
}
export default http
