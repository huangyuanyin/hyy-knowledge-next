export const base64UrlEncode = (data: string) => {
  const encoded = btoa(unescape(encodeURIComponent(data)))
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export const base64UrlDecode = (encodedData: string) => {
  encodedData = encodedData.replace(/-/g, '+').replace(/_/g, '/')
  while (encodedData.length % 4) {
    encodedData += '='
  }
  return decodeURIComponent(escape(atob(encodedData)))
}
