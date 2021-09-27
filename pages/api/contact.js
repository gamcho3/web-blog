import { connectDatabase } from "../../lib/db";
async function ContactHandler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      throw new Error("error");
    }

    const newMessage = {
      name,
      email,
      message,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res.status(400).json({ msg: "connect error" });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      return res.status(500).json({ msg: "storing message fail" });
    }

    return res.status(201).json({ msg: "success!", newMessage });
  }
}

export default ContactHandler;
