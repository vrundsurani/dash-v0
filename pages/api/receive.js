let messages = []; // Temporary in-memory storage

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_id, name, message } = req.body;
    messages.push({ user_id, name, message, timestamp: Date.now() });
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(messages);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
