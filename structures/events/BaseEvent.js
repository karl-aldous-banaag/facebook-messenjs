const BaseClient = require("../client/BaseClient");

class BaseEvent {
    /**
     * @param {BaseClient} client Facebook Messenger chatbot client
     * @param {Object} payload Object with data about event
     * @param {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {BaseClient} client Facebook Messenger chatbot client
     * @property {Object} payload Object with data about event
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     */
    constructor(client, payload, timestamp) {
        this.client = client;
        this.payload = payload;
        this.timestamp = timestamp;
    }
}

module.exports = BaseEvent;