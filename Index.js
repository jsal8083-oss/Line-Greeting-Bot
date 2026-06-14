const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);
const app = express();

app.post(
  "/webhook",
  line.middleware(config),
  async (req, res) => {
    const events = req.body.events;

    for (const event of events) {
      if (event.type === "memberJoined") {
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: "🎉 Welcome to the INFOCHAT bulletin for Marvel Contest of Champions related information and infographics.\n\nThis chat is READ ONLY!\n\nPlease DO NOT post in this chat unless you have been given permission."
        });
      }
    }

    res.sendStatus(200);
  }
);

app.listen(process.env.PORT || 3000);
