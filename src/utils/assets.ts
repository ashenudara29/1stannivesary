/**
 * Resolves static asset paths so they work reliably across local development
 * and production environments (such as GitHub Pages with subpath bases).
 */
export const resolveAssetUrl = (url?: string): string => {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  return `${cleanBase}${cleanUrl}`;
};
