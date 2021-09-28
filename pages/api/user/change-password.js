import { getSession } from "next-auth/client";
import { connectDatabase } from "../../../lib/db";
import { hashPassword, comparePassword } from "../../../lib/auth";
async function Handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ msg: "not authorized", status: "error" });
  }
  const { oldPassword, newPassword } = req.body;
  if (oldPassword.trim() === "" || newPassword.trim() === "") {
    return res.status(401).json({ msg: "No empty", status: "error" });
  }

  const client = await connectDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: session.user.email });
  const isValid = await comparePassword(oldPassword, user.password);
  if (!isValid) {
    return res
      .status(401)
      .json({ msg: "previous password is not correct", status: "error" });
  } else {
    const hashedPassword = await hashPassword(newPassword);
    await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { password: hashedPassword } }
    );
    res.status(201).json({ msg: "password updated!", status: "success" });
  }
}

export default Handler;
