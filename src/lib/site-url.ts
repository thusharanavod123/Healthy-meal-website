const FALLBACK_SITE_URL = "https://freshtable.com";

function normalizeUrl(value?: string) {
  const candidate = value?.trim();
  if (!candidate) return null;
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)
    ?? normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    ?? normalizeUrl(process.env.VERCEL_URL)
    ?? FALLBACK_SITE_URL;
}
