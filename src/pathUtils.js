const baseUrl = import.meta.env.BASE_URL || "/";

function normalizeBasePath(basePath) {
  if (!basePath || basePath === "/") {
    return "";
  }

  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

const normalizedBasePath = normalizeBasePath(baseUrl);

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
  return `${baseUrl}${assetName.replace(/^\//, "")}`;
}
