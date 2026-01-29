export function getCookie(name) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) {
    return null;
  }

  const value = match.split("=").slice(1).join("=");
  return value ? decodeURIComponent(value) : null;
}
