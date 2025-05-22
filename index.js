const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const TELEGRAM_TOKEN = '8120442965:AAHiSSFr57vyXTr6ODLRbO42yPhUq8HpYR8';
const OPENAI_API_KEY = 'sk-...93UA';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Ты — цифровой помощник KUDAIBERGEN TEAM. Отвечай кратко, вдохновляюще, с уважением." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await gptResponse.json();
  const reply = data.choices[0].message.content;
  bot.sendMessage(chatId, reply);
});
