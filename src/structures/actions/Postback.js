const Client = require("../../client/Client");
const Action = require("./Action");
const Message = require("../message/Message");

class Postback extends Action {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} [raw] Object with data about event
     * @property {Client} client Messenger chatbot client
     * @property {Profile} sender Sender of message
     * @property {Profile} recipient Recipient of message
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Message} message Message delivered
     * @property {Number} watermark
     */
    constructor(client, raw = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: 0,
        postback: {
            title: '',
            payload: '',
            mid: ''
        }
    }) {
        super(client, raw, raw.timestamp);

        this.sender = client.profileManager.fetch(raw.sender.id, "profile");
        this.recipient = client.profileManager.fetch(raw.recipient.id, "profile");
        this.message = new Message(client, {
            sender: { id: raw.sender.id },
            recipient: { id: raw.recipient.id },
            timestamp: new Date().getTime(),
            message: {
                mid: raw.postback.mid,
                text: raw.postback.title
            }
        });
        this.payload = raw.postback.payload;
    }
}

module.exports = Postback;