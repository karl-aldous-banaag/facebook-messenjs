const BaseClient = require('../client/BaseClient');
const Profile = require('../Profile');

class Message {
    /**
     * @param {BaseClient} client
     * @param {Object} payload
     */
    constructor(client, payload = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: new Date().getTime(),
        message: {
            mid: "",
            text: text
        }
    }) {
        this.client = client;
        this.payload = payload;
        this.sender = client.profileManager.fetch(payload.sender.id, "profile");
        this.recipient = client.profileManager.fetch(payload.recipient.id, "profile");
        this.timestamp = payload.timestamp;
        this.id = payload.message.mid;
        this.text = payload.message.text;
        this.quickReplies = [];

        if ("quick_reply" in payload.message) {
            this.quickReplyPayload = payload.message.quick_reply.payload;
        }

        this.client.messageManager.cache.set(this.id, this);
    }
}

module.exports = Message;