// Validates an absolute http(s) URL. Used by the registration steps that accept
// optional URLs (owner LinkedIn profile, company logo).
const isValidUrl = (value) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default {
  isValidUrl,
}
