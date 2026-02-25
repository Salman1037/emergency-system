import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
    }
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists." }), { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return new Response(JSON.stringify({ message: "User registered successfully." }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
