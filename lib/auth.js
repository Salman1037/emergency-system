import jwt from "jsonwebtoken";

// For Next.js Web API Response, return cookie header string
export function getAuthCookieHeader(token) {
  return `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
}

export function getClearAuthCookieHeader() {
  return `token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function clearAuthCookie(res) {
  res.setHeader("Set-Cookie", `token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function getUserFromRequest(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;
  try {
    return jwt.verify(match[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
