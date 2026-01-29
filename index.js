const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.APP_URL; // Back4App URL

const bot = new TelegramBot(TOKEN);
const app = express();

app.use(express.json());

// Webhook সেট করা
bot.setWebHook(`${URL}/bot${TOKEN}`);

// Telegram update রিসিভ করা
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Bot commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "✅ Bot Live!\nBack4App এ সফলভাবে চলছে 🚀"
  );
});

// Test route
app.get("/", (req, res) => {
  res.send("Bot Server Running ✅");
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
