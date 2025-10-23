export function createFetchRequest(req) {
  // utility: converts express request to fetch request
  const origin = `${req.protocol}://${req.get('host')}`
  // vite middleware might change the url, so use originalUrl if available
  const url = new URL(req.originalUrl || req.url, origin)
  // handling if request is closed
  const controller = new AbortController()
  req.on('close', () => controller.abort())
  // map express headers to fetch headers
  const headers = new Headers()
  for (const [key, values] of Object.entries(req.headers)) {
    if (!values) continue
    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value)
      }
    } else {
      headers.set(key, values)
    }
  }
  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  }
  // for if request is not GET or HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }
  return new Request(url.href, init)
}
