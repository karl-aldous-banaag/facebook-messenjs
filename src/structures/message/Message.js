const Client = require('../../client/Client');

class Message {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} [raw] JSON object with data of message
     * @property {Client} client Facebook Messenger chatbot client
     * @property {Object} raw JSON object with data of message
     * @property {Profile} sender Sender of message
     * @property {Profile} recipient Recipient of message
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {String} id ID of message
     * @property {string} text Text of message
     * @property {Array} quickReplies Quick replies of message
     * @property {Object} [payload] Payload of message (if any)
     */
    constructor(client, raw = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: new Date().getTime(),
        message: {
            mid: "",
            text: text
        }
    }) {
        this.client = client;
        this.raw = raw;
        this.sender = client.profileManager.fetch(raw.sender.id, "profile");
        this.recipient = client.profileManager.fetch(raw.recipient.id, "profile");
        this.timestamp = raw.timestamp;
        this.isEcho = "is_echo" in raw.message
        this.id = raw.message.mid;
        this.text = raw.message.text;
        this.quickReplies = [];

        if ("quick_reply" in raw.message) { this.payload = raw.message.quick_reply.payload; }

        this.client.messageManager.cache.set(this.id, this);
    }
}

module.exports = Message;