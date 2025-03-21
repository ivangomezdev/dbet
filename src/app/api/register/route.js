// app/api/register/route.js
import { User } from "../../lib/db.js";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscriptionStatus: "pending",
    });
    return Response.json({ message: "User created", userId: newUser.id }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}