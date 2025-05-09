// /api/telegram.js

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.Bot_Token;

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Get Me In</title>
      </head>
      <body>
        <form id="form">
          <h2>Get Me In</h2>
          <input type="text" id="chatId" placeholder="Chat I" required />
          <textarea id="message" placeholder="Your message..." required></textarea>
          <button type="submit">In</button>
        </form>
        <script>
          document.getElementById('form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const chatId = document.getElementById('chatId').value;
            const message = document.getElementById('message').value;
            const res = await fetch('/api/telegram', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ chatId, message })
            });
            const result = await res.json();
            alert(result.success ? '✅ Sent!' : '❌ ' + result.error);
          });
        </script>
      </body>
      </html>
    `);
  }

  else if (req.method === 'POST') {
    try {
      const { chatId, message } = req.body;
      const telegram = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });

      const data = await telegram.json();
      if (!data.ok) throw new Error(data.description);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
