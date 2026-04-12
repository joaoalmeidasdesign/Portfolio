function resolveRuntimeBasePath() {
  // In dev, Vite serves from the domain root.
  if (import.meta.env.DEV) {
    return "";
  }

  // In production, infer the deployed base path from the built asset URL.
  const scriptUrl = new URL(import.meta.url);
  const assetMatch = scriptUrl.pathname.match(/^(.*)\/assets\/[^/]+$/);

  if (!assetMatch) {
    return "";
  }

  return assetMatch[1] || "";
}

function normalizeBasePath(basePath) {
  if (!basePath || basePath === "/" || basePath === "./") {
    return "";
  }

  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

const normalizedBasePath = normalizeBasePath(resolveRuntimeBasePath());

export function getAppPathname() {
  const rawPathname = window.location.pathname || "/";

  if (!normalizedBasePath) {
    return rawPathname;
  }

  if (rawPathname === normalizedBasePath) {
    return "/";
  }

  if (rawPathname.startsWith(`${normalizedBasePath}/`)) {
    return rawPathname.slice(normalizedBasePath.length) || "/";
  }

  return rawPathname;
}

export function restoreRedirectPath() {
  const currentUrl = new URL(window.location.href);
  const redirectedPath = currentUrl.searchParams.get("redirect");

  if (!redirectedPath) {
    return;
  }

  // 404.html stores the original route in `redirect` so the SPA can restore it.
  const redirectUrl = new URL(redirectedPath, window.location.origin);
  const nextPathname = withBasePath(redirectUrl.pathname);
  const nextUrl = `${nextPathname}${redirectUrl.search}${redirectUrl.hash}`;

  window.history.replaceState({}, "", nextUrl);
}

export function withBasePath(pathname = "/") {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!normalizedBasePath) {
    return normalizedPathname;
  }

  return `${normalizedBasePath}${normalizedPathname}`;
}
