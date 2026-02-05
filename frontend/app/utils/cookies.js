export function getCookie(name) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split(";")
    .map((row) => row.trim())
    .find((row) => row.startsWith(`${name}=`));
  if (!match) {
    return null;
  }

  const value = match.split("=").slice(1).join("=");
  return value ? decodeURIComponent(value) : null;
}

export function setCookie(name, value, options = {}) {
  if (typeof document === "undefined") {
    return;
  }

  const {
    path = "/",
    maxAge = 60 * 60 * 24 * 365,
    sameSite = "Lax",
  } = options;

  const encodedValue = encodeURIComponent(String(value));
  let cookie = `${name}=${encodedValue}; path=${path}; max-age=${maxAge}; samesite=${sameSite}`;

  if (options.secure) {
    cookie += "; secure";
  }

  document.cookie = cookie;
}
