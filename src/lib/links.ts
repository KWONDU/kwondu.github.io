// External (http/https) links open in a new tab. In-page anchors and mailto: stay as is.
export function ext(url?: string) {
  return url && /^https?:\/\//.test(url) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
