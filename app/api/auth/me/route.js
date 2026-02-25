import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return new Response(JSON.stringify({ user: null }), { status: 200 });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  } catch {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
}
