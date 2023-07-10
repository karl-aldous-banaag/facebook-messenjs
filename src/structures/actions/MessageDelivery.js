const Client = require("../../client/Client");
const Action = require("./Action");

class MessageDelivery extends Action {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} raw Object with data about event
     * @property {Client} client Messenger chatbot client
     * @property {Profile} sender Sender of message
     * @property {Profile} recipient Recipient of message
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Message} [message] Message delivered
     * @property {Number} watermark
     */
    constructor(client, raw = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: 0,
        delivery: { mids: [], watermark: 0 }
    }) {
        super(client, raw, raw.timestamp);

        this.sender = client.profileManager.fetch(raw.sender.id, "profile");
        this.recipient = client.profileManager.fetch(raw.recipient.id, "profile");
        // this.message = client.messageManager.cache.get(raw.delivery.mids[0]);
        this.watermark = raw.delivery.watermark;
    }
}

module.exports = MessageDelivery;