const Profile = require('../Profile');
const BaseEvent = require('./BaseEvent');

class ReadEvent extends BaseEvent{
    /**
     * @param {BaseClient} client 
     * @param {Object} payload
     */
    constructor(client, payload = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: 0,
        read: { watermark: 0 }
    }) {
        super(client, payload, payload.timestamp);

        this.sender = new Profile(client, payload.sender.id);
        this.recipient = new Profile(client, payload.recipient.id);
        this.read = payload.read;
    }
}

module.exports = ReadEvent;