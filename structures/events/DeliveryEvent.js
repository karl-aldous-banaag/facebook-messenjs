const BaseClient = require("../client/BaseClient");
const BaseEvent = require("./BaseEvent");

class DeliveryEvent extends BaseEvent{
    /**
     * @param {BaseClient} client 
     * @param {Object} payload
     */
    constructor(client, payload = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: 0,
        delivery: { mids: [], watermark: 0 }
    }) {
        super(client, payload, payload.timestamp);

        this.sender = client.profileManager.fetch(payload.sender.id, "profile");
        this.recipient = client.profileManager.fetch(payload.recipient.id, "profile");
        this.message = client.messageManager.cache.get(payload.delivery.mids[0]);
        this.watermark = payload.delivery.watermark;
    }
}

module.exports = DeliveryEvent;