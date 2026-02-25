
import { cookies } from "next/headers";

export async function POST() {
  // Clear the auth cookie using Next.js cookies() helper (async in Next.js 16)
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0
  });
  return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
}
