const Profile = require('../Profile');
const BaseEvent = require('./BaseEvent');

class ReadEvent extends BaseEvent{
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} raw Object with data about event
     * @property {Client} client Messenger chatbot client
     * @property {Profile} sender Sender of message
     * @property {Profile} recipient Recipient of message
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Object} read
     * @property {Number} watermark
     */
    constructor(client, raw = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: 0,
        read: { watermark: 0 }
    }) {
        super(client, raw, raw.timestamp);

        this.sender = new Profile(client, raw.sender.id);
        this.recipient = new Profile(client, raw.recipient.id);
        this.read = raw.read;
    }
}

module.exports = ReadEvent;