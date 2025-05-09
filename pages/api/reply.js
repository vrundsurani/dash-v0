export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_id, message } = req.body;

    const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: user_id, text: message }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
