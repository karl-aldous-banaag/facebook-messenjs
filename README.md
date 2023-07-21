# Facebook MessenJS
Facebook MessenJS is an API wrapper for Facebook Messenger inspired by [discord.js](https://discord.js.org/). This library  allows you to interact with [Facebook Messenger's API](https://developers.facebook.com/docs/messenger-platform/). The bot was programmed with an object-oriented approach so that people can program their Facebook Messenger chatbots with ease.

## Installation
```
npm i facebook-messenjs
```

## Example Usage
Create a simple quick example bot:
``` js
const { Client } = require('facebook-messenjs');

const bot = new Client({
    pageToken: "PAGE_TOKEN_FROM_FACEBOOK",
    verifyToken: "YOUR_VERIFY_TOKEN",
    appID: "APP_ID_FROM_FACEBOOK"
});

// Allows Facebook to know that you set the URL of the bot properly
bot.on('webhookVerify', verification => {
    if (verification.success) {
        console.log("Webhook verified with Facebook successfully!");
    } else {
        console.log("Webhook verified with Facebook failed! ;-;");
    }
});

// Processes messages from people who message the Facebook page
bot.on("messages", message => {
    message.sender.send("Hi!");
});

// Turns on the bot at port 5566
bot.listen(5566, () => {
    console.log(`Facebook Messenger chatbot listening at http://localhost:${bot.port}`);
});
```

Use quick replies:
``` js
bot.on('messages', message => {
    if (!message.payload) { // Checks if the message has a payload
        message.sender.send("Hi! What is your favorite color?", [
            new QuickReplies.Text("Red", "RESPONSE_RED"),
            new QuickReplies.Text("Yellow", "RESPONSE_YELLOW"),
            new QuickReplies.Text("Others", "RESPONSE_OTHERS")
        ]);
    } else {
        // Responds appropriately to payloads
        switch (message.payload) {
            case "RESPONSE_RED":
                message.sender.send("Red? Me too!");
            break;
            case "RESPONSE_OTHERS":
                message.sender.send("Yellow? That's a nice color!");
            break;
            default:
                message.sender.send("I like that color too.");
        }
    }
});
```

Set persistent menu:
``` js
const { PostbackButton } = require('facebook-messenjs');

bot.on('messagingPostback', postback => {
    if (postback.payload === "GET_STARTED") {
        postback.sender.setPersistentMenu([
            new PostbackButton("Button 1", "PAYLOAD_ONE"),
            new PostbackButton("Button 2", "PAYLOAD_TWO")
        ]);
    }
});
```

Send pictures:
``` js
const { BaseAttachment } = require('facebook-messenjs');

const picture = new BaseAttachment(bot, "image", {
    content: "./picture.png",
    reusable: true
});

bot.on("messages", message => {
    message.sender.send(picture);
});
```