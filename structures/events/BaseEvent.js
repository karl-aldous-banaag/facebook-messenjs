const BaseClient = require("../client/BaseClient");

class BaseEvent {
    /**
     * @param {BaseClient} client 
     * @param {Object} payload 
     * @param {Number} timestamp
     */
    constructor(client, payload, timestamp) {
        this.client = client;
        this.payload = payload;
        this.timestamp = timestamp;
    }
}

module.exports = BaseEvent;