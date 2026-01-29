const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

// ENV variables
const TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL;
const PORT = process.env.PORT || 3000;

if (!TOKEN || !APP_URL) {
  console.error("❌ BOT_TOKEN or APP_URL missing");
  process.exit(1);
}

// Telegram bot (webhook mode)
const bot = new TelegramBot(TOKEN);

// Set webhook
bot.setWebHook(`${APP_URL}/bot${TOKEN}`);

// Webhook endpoint
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "✅ Bot Live!\nBack4App-এ সফলভাবে চলছে 🚀"
  );
});

bot.onText(/\/ping/, (msg) => {
  bot.sendMessage(msg.chat.id, "🏓 Pong!");
});

// Health check
app.get("/", (req, res) => {
  res.send("Bot Server Running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
