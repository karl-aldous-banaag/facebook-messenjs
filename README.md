# Facebook MessenJS
Facebook MessenJS is an API wrapper for Facebook Messenger inspired by [discord.js](https://discord.js.org/) that allows you to interact with [Facebook Messenger's API](https://developers.facebook.com/docs/messenger-platform/). The bot was programmed with an object-oriented approach so that people can program their Facebook Messenger chatbots with ease.

## Example
### Installation
```
npm i facebook-messenjs
```

### Simple Chatbot
``` js
const { Client } = require('facebook-messenjs');

const config = require('../config.json');
const bot = new Client({
    pageToken: config.botToken,
    verifyToken: config.verifyToken,
    appID: config.appID
});

bot.on("messages", message => {
    message.sender.send("Hi!");
});

bot.listen(5566, () => {
    console.log(`Facebook Messenger chatbot listening at http://localhost:${bot.port}`);
})
```