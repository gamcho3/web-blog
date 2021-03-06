import { connectDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { getSession } from "next-auth/client";
async function authHandler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return res
        .status(422)
        .json({ msg: "please enter correct answer", status: "error" });
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res.status(400).json({ msg: "connect error", status: "error" });
    }
    const db = client.db();
    const existUser = await db.collection("users").findOne({ email });
    if (existUser) {
      return res
        .status(422)
        .json({ msg: "email already exist", status: "error" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    await db.collection("users").insertOne(newUser);
    res.status(201).json({ msg: "signup success!", status: "success" });
  }

  if (req.method === "DELETE") {
    try {
      const session = await getSession({ req });
      const { email } = session.user;
      const client = await connectDatabase();
      const db = client.db();
      const user = await db.collection("users").findOne({ email });
      await db.collection("users").deleteOne(user);
      res.status(201).json({ msg: "success" });
      return;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default authHandler;
