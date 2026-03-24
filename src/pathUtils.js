const baseUrl = import.meta.env.BASE_URL || "/";

function resolveRuntimeBasePath() {
  if (import.meta.env.DEV) {
    return "";
  }

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

export function withBasePath(pathname = "/") {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!normalizedBasePath) {
    return normalizedPathname;
  }

  return `${normalizedBasePath}${normalizedPathname}`;
}

export function assetPath(assetName) {
  const normalizedAssetName = assetName.replace(/^\//, "");

  if (!normalizedBasePath) {
    return `${baseUrl}${normalizedAssetName}`;
  }

  return `${normalizedBasePath}/${normalizedAssetName}`;
}
